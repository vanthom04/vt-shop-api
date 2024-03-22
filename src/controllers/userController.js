import { StatusCodes } from 'http-status-codes'

import userService from '~/services/userService'

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    res.status(StatusCodes.OK).json({ users })
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id)
    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    next(error)
  }
}

const userController = {
  getAllUsers,
  getUserById
}

export default userController
