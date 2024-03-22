import express from 'express'

import userController from '~/controllers/userController'

const userRoute = express.Router()

userRoute
  .route('/')
  .get(userController.getAllUsers)

userRoute
  .route('/:id')
  .get(userController.getUserById)
  .put()

export default userRoute
