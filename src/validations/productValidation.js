import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(6).max(200).trim().strict(),
    brand: Joi.string().required().trim().strict(),
    price: Joi.number().required(),
    stockQuantity: Joi.number().required()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: true, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const productValidation = {
  createNew
}

export default productValidation
