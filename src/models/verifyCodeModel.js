import Joi from 'joi'
import { getDB } from '~/config/mongodb'

const verifyCodeCollectionName = 'verifyCodes'
const verifyCodeCollectionSchema = Joi.object({
  username: Joi.string().max(20).trim().strict(),
  email: Joi.string().max(30).email().trim().strict(),
  verifyCode: Joi.number().required(),
  //
  createdAt: Joi.date().timestamp('javascript').default(Date.now())
})

const validateBeforeCreate = async (data) => {
  try {
    return await verifyCodeCollectionSchema.validateAsync(data, { abortEarly: false })
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await getDB().collection(verifyCodeCollectionName).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOne = async (code) => {
  try {
    return await getDB().collection(verifyCodeCollectionName).findOne({
      verifyCode: code
    })
  } catch (error) {
    throw new Error(error)
  }
}

const deleteMany = async () => {
  try {
    return await getDB().collection(verifyCodeCollectionName).createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 5 * 60 }
    )
  } catch (error) {
    throw new Error(error)
  }
}

const verifyCodeModel = {
  verifyCodeCollectionName,
  verifyCodeCollectionSchema,
  createNew,
  findOne,
  deleteMany
}

export default verifyCodeModel
