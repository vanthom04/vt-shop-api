import Joi from 'joi'
import { ObjectId } from 'mongodb'

import { getDB } from '~/config/mongodb'

const productCollectionName = 'products'
const productCollectionSchema = Joi.object({
  name: Joi.string().required().min(6).max(200).trim().strict(),
  slug: Joi.string().required().min(1).trim().strict(),
  brand: Joi.string().required().trim().strict(),
  description: Joi.string().trim().strict(),
  price: Joi.number().required(),
  stockQuantity: Joi.number().required(),
  imagePath: Joi.string().trim().strict().default(null),
  category: Joi.string().trim().strict(),
  rating: Joi.number().default(0),
  warranty: Joi.string().trim().strict(),
  featured: Joi.boolean().default(false),
  status: Joi.string().trim().strict(),
  // Thông số kỹ thuật
  specifications: Joi.object({
    cpu: Joi.string(),
    ram: Joi.string(),
    storage: Joi.string(),
    graphicCard: Joi.string(),
    display: Joi.string(),
    audio: Joi.string(),
    webcam: Joi.string(),
    portConnection: Joi.string(),
    wirelessConnectivity: Joi.string(),
    weight: Joi.string(),
    size: Joi.string(),
    pin: Joi.string(),
    color: Joi.string()
  }).default({}),
  //
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  try {
    return await productCollectionSchema.validateAsync(data, { abortEarly: false })
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await getDB().collection(productCollectionName).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const getAllProducts = async () => {
  try {
    return await getDB().collection(productCollectionName).find().sort({
      createdAt: -1
    }).toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB().collection(productCollectionName).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const productModel = {
  productCollectionName,
  productCollectionSchema,
  createNew,
  getAllProducts,
  findOneById
}

export default productModel
