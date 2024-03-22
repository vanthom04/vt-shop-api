import { StatusCodes } from 'http-status-codes'

import cartService from '~/services/cartService'

const createNew = async (req, res, next) => {
  try {
    const createdCart = await cartService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({ cart: createdCart })
  } catch (error) {
    next(error)
  }
}

const getCartByUserId = async (req, res, next) => {
  try {
    const cart = await cartService.getCartByUserId(req.params.userId)
    res.status(StatusCodes.OK).json({ cart })
  } catch (error) {
    next(error)
  }
}

const addProductToCart = async (req, res, next) => {
  try {
    const cart = await cartService.addProductToCart(req.params)
    res.status(StatusCodes.OK).json({ cart })
  } catch (error) {
    next(error)
  }
}

const removeProductFromCart = async (req, res, next) => {
  try {
    const cart = await cartService.removeProductFromCart(req.params)
    res.status(StatusCodes.OK).json({ cart })
  } catch (error) {
    next(error)
  }
}

const cartController = {
  createNew,
  getCartByUserId,
  addProductToCart,
  removeProductFromCart
}

export default cartController
