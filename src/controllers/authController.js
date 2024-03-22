import { StatusCodes } from 'http-status-codes'

import authService from '~/services/authService'

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body)
    res.status(StatusCodes.CREATED).json({ user })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body)
    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    next(error)
  }
}

const verifyCode = async (req, res, next) => {
  try {
    const status = await authService.verifyCode(req.body)
    res.status(StatusCodes.OK).json(status)
  } catch (error) {
    next(error)
  }
}

const authController = {
  registerUser,
  loginUser,
  verifyCode
}

export default authController
