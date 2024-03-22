import express from 'express'
import multer from 'multer'

import slideController from '~/controllers/slideController'

const slideRoute = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024
  }
})

const typeCreateNew = upload.fields([
  { name: 'title' },
  { name: 'imagePath' }
])

slideRoute
  .route('/create-new')
  .post(typeCreateNew, slideController.createNew)

slideRoute
  .route('/')
  .get(slideController.getAllSlides)

export default slideRoute
