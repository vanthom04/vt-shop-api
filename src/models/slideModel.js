import Joi from 'joi'
import { ObjectId } from 'mongodb'

import { getDB } from '~/config/mongodb'

const slideCollectionName = 'slides'
const slideCollectionSchema = Joi.object({
  title: Joi.string().required().trim().strict(),
  slug: Joi.string().required().trim().strict(),
  imagePath: Joi.string().required().trim().strict(),
  //
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await slideCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await getDB().collection(slideCollectionName).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const getAllSlides = async () => {
  try {
    return await getDB().collection(slideCollectionName).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB().collection(slideCollectionName).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const slideModel = {
  slideCollectionName,
  slideCollectionSchema,
  createNew,
  getAllSlides,
  findOneById
}

export default slideModel
