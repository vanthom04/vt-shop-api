import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

import * as firebaseAdmin from '~/config/firebaseAdmin'
import userModel from '~/models/userModel'
import ApiError from '~/utils/ApiError'

const getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers()
    if (users.length === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Users not found!')
    }

    const newUsers = cloneDeep(users)
    const resUsers = []

    for (const user of newUsers) {
      const imagePath = user?.imagePath
      delete user?.imagePath
      resUsers.push({
        ...user,
        photoURL: !!imagePath ? await firebaseAdmin.getImageURLByName(imagePath) : null
      })
    }
    return resUsers
  } catch (error) {
    throw error
  }
}

const getUserById = async (userId) => {
  try {
    const user = await userModel.findOneById(userId)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    }

    const resUser = cloneDeep(user)
    const imagePath = resUser?.imagePath
    delete resUser?.imagePath

    return {
      ...resUser,
      photoURL: !!imagePath ? await firebaseAdmin.getImageURLByName(imagePath) : ''
    }
  } catch (error) {
    throw error
  }
}

const userService = {
  getAllUsers,
  getUserById
}

export default userService
