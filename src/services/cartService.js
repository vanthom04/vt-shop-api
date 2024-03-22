import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

import * as firebaseAdmin from '~/config/firebaseAdmin'
import cartModel from '~/models/cartModel'
import productModel from '~/models/productModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newCart = { ...reqBody }
    const createdCart = await cartModel.createNew(newCart)
    return await cartModel.findOneById(createdCart.insertedId)
  } catch (error) {
    throw error
  }
}

const getCartByUserId = async (userId) => {
  try {
    const cart = await cartModel.findOneByUserId(userId)
    if (!cart) return {}

    const totalPrice = cart.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    const newProducts = cloneDeep(cart.products)
    const products = []

    for (const product of newProducts) {
      const fileName = product?.imagePath
      delete product?.imagePath
      products.push({
        ...product,
        thumbnail: await firebaseAdmin.getImageURLByName(fileName) || ''
      })
    }

    return {
      ...cart,
      products,
      totalPrice,
      totalProducts: cart.products.length
    }
  } catch (error) {
    throw error
  }
}

const addProductToCart = async (reqParams) => {
  try {
    const { userId, productId, quantity } = reqParams

    const product = await productModel.findOneById(productId)
    const userCart = await cartModel.findOneByUserId(userId)
    if (!userCart || !product) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User or product not found!')
    }

    const products = cloneDeep(userCart.products)
    const productItemCart = await products.find(product => {
      return product.productId.toString() === productId
    })

    if (productItemCart) {
      const total = !quantity ? productItemCart.quantity + 1 : productItemCart.quantity + parseInt(quantity)
      return await cartModel.updateProductCart(userId, productId, total)
    } else {
      return await cartModel.addProductToCart(userId, {
        productId: product._id,
        name: product.name,
        imagePath: product.imagePath,
        price: product.price,
        quantity: parseInt(quantity)
      })
    }
  } catch (error) {
    throw error
  }
}

const removeProductFromCart = async (reqParams) => {
  try {
    const { userId, productId } = reqParams

    return await cartModel.removeProductFromCart(userId, productId)
  } catch (error) {
    throw error
  }
}

const cartService = {
  createNew,
  getCartByUserId,
  addProductToCart,
  removeProductFromCart
}

export default cartService
