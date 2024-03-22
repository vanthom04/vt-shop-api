import express from 'express'
import multer from 'multer'

import productValidation from '~/validations/productValidation'
import productController from '~/controllers/productController'

const productRoute = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024
  }
})
const typeCreateProduct = upload.fields([
  { name: 'name' },
  { name: 'brand' },
  { name: 'description' },
  { name: 'price' },
  { name: 'stockQuantity' },
  { name: 'category' },
  { name: 'warranty' },
  { name: 'featured' },
  { name: 'specifications' },
  { name: 'imagePath' }
])

productRoute
  .route('/create-new')
  .post(typeCreateProduct, productValidation.createNew, productController.createNew)

productRoute
  .route('/:id')
  .get(productController.getProductById)
  .put((req, res) => {
    res.json({})
  })

productRoute
  .route('/')
  .get(productController.getAllProducts)

export default productRoute
