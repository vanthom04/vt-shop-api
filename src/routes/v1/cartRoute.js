import express from 'express'
import cartController from '~/controllers/cartController'

const cartRoute = express.Router()

cartRoute
  .route('/:userId')
  .get(cartController.getCartByUserId)

cartRoute
  .route('/:userId/:productId/:quantity?')
  .post(cartController.addProductToCart)

cartRoute
  .route('/:userId/:productId')
  .delete(cartController.removeProductFromCart)

export default cartRoute
