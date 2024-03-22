import { cloneDeep } from 'lodash'
import UUID from 'uuid-v4'

import { slugify } from '~/utils/formatters'
import { filterProducts } from '~/utils/constants'
import productModel from '~/models/productModel'
import * as firebaseAdmin from '~/config/firebaseAdmin'

const createNew = async (req) => {
  try {
    const uniqueId = UUID()
    const imagePath = req.files?.imagePath[0]
    const newProduct = {
      ...req.body,
      slug: slugify(req.body.name)
    }

    const folders = [productModel.productCollectionName, newProduct.brand].join('/')
    const type = imagePath?.mimetype.split('/')[1]
    const fileName = `${folders}/${newProduct.slug}-${uniqueId}.${type}`

    const createdProduct = await productModel.createNew({
      ...newProduct,
      imagePath: fileName
    })

    await firebaseAdmin.uploadFile(imagePath, fileName)

    return await productModel.findOneById(createdProduct.insertedId)
  } catch (error) {
    throw error
  }
}

const getAllProducts = async (reqQuery) => {
  try {
    const { name, brand, category, featured } = reqQuery

    const products = await productModel.getAllProducts()
    if (products.length === 0) return []

    const newProducts = cloneDeep(products)
    const resProducts = []

    for (const product of newProducts) {
      const fileName = product?.imagePath
      delete product?.imagePath
      resProducts.push({
        ...product,
        thumbnail: !!fileName ? await firebaseAdmin.getImageURLByName(fileName) : ''
      })
    }
    return filterProducts(resProducts, { name, brand, category, featured })
  } catch (error) {
    throw error
  }
}

const getProductById = async (productId) => {
  try {
    const product = await productModel.findOneById(productId)
    if (!product) return {}

    const resProduct = cloneDeep(product)
    const fileName = resProduct?.imagePath
    delete resProduct?.imagePath

    return {
      ...resProduct,
      thumbnail: !!fileName ? await firebaseAdmin.getImageURLByName(fileName) : null
    }
  } catch (error) {
    throw error
  }
}

const productService = {
  createNew,
  getAllProducts,
  getProductById
}

export default productService
