import express from 'express'
import multer from 'multer'

import authValidation from '~/validations/authValidation'
import authController from '~/controllers/authController'

const authRoute = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024
  }
})
const typeCreateNew = upload.fields([
  { name: 'fullName' },
  { name: 'username' },
  { name: 'email' },
  { name: 'password' },
  { name: 'imagePath' }
])

authRoute
  .route('/create-new')
  .post(typeCreateNew, authValidation.registerUser, authController.registerUser)

authRoute
  .route('/register')
  .post(authValidation.registerUser, authController.registerUser)

authRoute
  .route('/login')
  .post(authValidation.loginUser, authController.loginUser)

authRoute
  .route('/verify')
  .post(authController.verifyCode)

authRoute
  .route('/logout')
  .post()

export default authRoute
