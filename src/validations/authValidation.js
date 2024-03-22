import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const registerUser = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      email: Joi.string().required().trim().strict().email(),
      username: Joi.string().required().min(3).max(20).trim().strict(),
      password: Joi.string().required().min(6).max(100).trim().strict()
    })

    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const loginUser = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      username: Joi.string().required().min(3).max(20).trim().strict(),
      password: Joi.string().required().min(6).max(100).trim().strict()
    })

    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const authValidation = {
  registerUser,
  loginUser
}

export default authValidation
