import Joi from 'joi'
import { ObjectId } from 'mongodb'

import { getDB } from '~/config/mongodb'

const userCollectionName = 'users'
const userCollectionSchema = Joi.object({
  fullName: Joi.string().max(50).trim().strict().default(''),
  username: Joi.string().min(3).max(20).trim().strict(),
  email: Joi.string().max(50).email().trim().strict(),
  password: Joi.string().min(6).max(100).required().trim().strict(),
  imagePath: Joi.string().trim().strict().default(null),
  //
  role: Joi.string().trim().strict().default('client'),
  isActive: Joi.boolean().default(false),
  //
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await userCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await getDB().collection(userCollectionName).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const checkDuplicate = async (username, email) => {
  try {
    return await getDB().collection(userCollectionName).findOne({
      $or: [{ username }, { email }]
    })
  } catch (error) {
    throw new Error(error)
  }
}

const verifyCode = async (username) => {
  try {
    return await getDB().collection(userCollectionName).updateOne(
      { username, isActive: false },
      { $set: { isActive: true } }
    )
  } catch (error) {
    throw new Error(error)
  }
}

const findOneByUsername = async (username) => {
  try {
    return await getDB().collection(userCollectionName).findOne({ username })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB().collection(userCollectionName).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const getAllUsers = async () => {
  try {
    return await getDB().collection(userCollectionName).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const userModel = {
  userCollectionName,
  userCollectionSchema,
  createNew,
  checkDuplicate,
  findOneByUsername,
  findOneById,
  getAllUsers,
  verifyCode
}

export default userModel
