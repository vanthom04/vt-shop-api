import { StatusCodes } from 'http-status-codes'

import productService from '~/services/productService'

const createNew = async (req, res, next) => {
  try {
    const product = await productService.createNew(req)
    res.status(StatusCodes.CREATED).json({ product })
  } catch (error) {
    next(error)
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts(req.query)
    res.status(StatusCodes.OK).json({ products })
  } catch (error) {
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id)
    res.status(StatusCodes.OK).json({ product })
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req)
    res.status(StatusCodes.OK).json({ product })
  } catch (error) {
    next(error)
  }
}

const productController = {
  createNew,
  getAllProducts,
  getProductById,
  updateProduct
}

export default productController
