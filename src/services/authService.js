import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import UUID from 'uuid-v4'

import * as firebaseAdmin from '~/config/firebaseAdmin'
import verifyCodeModel from '~/models/verifyCodeModel'
import cartModel from '~/models/cartModel'
import userModel from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { sendMail } from '~/utils/mailer'
// import { isVerifyCodeValid } from '~/utils/constants'

const createNewUser = async (req) => {
  try {
    const { username, email, password } = req.body
    const imagePath = req.files?.imagePath[0] || {}
    const uniqueId = UUID()

    const existingUser = await userModel.checkDuplicate(username, email)
    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Username or email already exists!')
    }

    const slat = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, slat)
    const folders = [userModel.userCollectionName].join('/')
    const type = imagePath?.mimetype.split('/')[1]
    const fileName = `${folders}/${username}-${uniqueId}.${type}`

    const createdUser = await userModel.createNew({
      ...req.body,
      password: hashPassword,
      imagePath: fileName
    })

    await firebaseAdmin.uploadFile(imagePath, fileName)

    await cartModel.createNew({
      userId: createdUser.insertedId.toString()
    })

    return await userModel.findOneById(createdUser.insertedId)
  } catch (error) {
    throw error
  }
}

const registerUser = async (reqBody) => {
  try {
    const { username, email, password } = reqBody

    const existingUser = await userModel.checkDuplicate(username, email)
    if (existingUser) {
      return {
        success: false,
        message: 'Username or email already exists!'
      }
    }

    const slat = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, slat)

    const createdUser = await userModel.createNew({
      ...reqBody,
      password: hashPassword
    })

    await cartModel.createNew({
      userId: createdUser.insertedId.toString()
    })

    await sendMail(email, username)
    const user = await userModel.findOneById(createdUser.insertedId)
    return {
      ...user,
      success: true
    }
  } catch (error) {
    throw error
  }
}

const verifyCode = async (reqBody) => {
  try {
    const { verifyCode } = reqBody

    if (!verifyCode) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'No verify code!')
    }

    const code = await verifyCodeModel.findOne(+verifyCode)
    if (!code) {
      return {
        success: false,
        message: 'Invalid code!'
      }
    }

    // const isValidCode = isVerifyCodeValid(code.createdAt, 15 * 60 * 1000)
    // if (!isValidCode) {
    //   return {
    //     success: false,
    //     message: 'Invalid code!'
    //   }
    // }

    const user = await userModel.findOneByUsername(code.username)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid username!')
    }

    if (!user.isActive) {
      await userModel.verifyCode(user.username)
    }

    return {
      userId: user._id,
      status: StatusCodes.OK,
      success: true,
      message: 'Verify account successfully!'
    }
  } catch (error) {
    throw error
  }
}

const loginUser = async (reqBody) => {
  try {
    const { username, password } = reqBody

    const user = await userModel.findOneByUsername(username)
    const validPassword = await bcrypt.compare(password, user?.password || '')
    if (!user || !validPassword) {
      return {
        status: false,
        message: 'Invalid username or password!'
      }
    }

    if (!user.isActive) {
      await sendMail(user.email, user.username)
      return {
        status: true,
        isActive: false,
        message: 'Account is not active!'
      }
    }

    if (user && user.isActive && validPassword) {
      const fileName = user?.imagePath
      return {
        status: true,
        isActive: true,
        userId: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        photoURL: !!fileName ? await firebaseAdmin.getImageURLByName(fileName) : ''
      }
    }
  } catch (error) {
    throw error
  }
}

const authService = {
  createNewUser,
  registerUser,
  loginUser,
  verifyCode
}

export default authService
