import Joi from 'joi'
import { ObjectId } from 'mongodb'

import { getDB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const cartCollectionName = 'carts'
const cartCollectionSchema = Joi.object({
  userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      name: Joi.string().min(3).max(120).trim().strict(),
      imagePath: Joi.string().trim().strict().default(null),
      price: Joi.number(),
      quantity: Joi.number()
    })
  ).default([]),
  //
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return cartCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await getDB().collection(cartCollectionName).insertOne({
      ...validData,
      userId: new ObjectId(validData.userId)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB().collection(cartCollectionName).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneByUserId = async (userId) => {
  try {
    return await getDB().collection(cartCollectionName).findOne({
      userId: new ObjectId(userId)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const addProductToCart = async (userId, item) => {
  try {
    const result = await getDB().collection(cartCollectionName).findOneAndUpdate(
      { userId: new ObjectId(userId) },
      { $push: {
        products: {
          $each: [
            {
              productId: new ObjectId(item.productId),
              name: item.name,
              imagePath: item.imagePath,
              price: item.price,
              quantity: item.quantity || 1
            }
          ],
          $position: 0
        }
      } },
      { returnDocument: 'after' }
    )
    return result || {}
  } catch (error) {
    throw new Error(error)
  }
}

const updateProductCart = async (userId, productId, quantity) => {
  try {
    const result = await getDB().collection(cartCollectionName).findOneAndUpdate(
      { userId: new ObjectId(userId), 'products.productId': new ObjectId(productId) },
      { $set: { 'products.$.quantity': quantity } },
      { returnDocument: 'after' }
    )

    return result || {}
  } catch (error) {
    throw new Error(error)
  }
}

const removeProductFromCart = async (userId, productId) => {
  try {
    return await getDB().collection(cartCollectionName).updateOne(
      { userId: new ObjectId(userId) },
      { $pull: { products: {
        productId: new ObjectId(productId)
      } } }
    )
  } catch (error) {
    throw new Error(error)
  }
}

const cartModel = {
  cartCollectionName,
  cartCollectionSchema,
  createNew,
  findOneById,
  findOneByUserId,
  addProductToCart,
  updateProductCart,
  removeProductFromCart
}

export default cartModel
