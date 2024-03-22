import express from 'express'

import siteRoute from './siteRoute'
import slideRoute from './slideRoute'
import authRoute from './authRoute'
import userRoute from './userRoute'
import productRoute from './productRoute'
import cartRoute from './cartRoute'

const APIs_V1 = express.Router()

APIs_V1.use('/', siteRoute)

APIs_V1.use('/slides', slideRoute)

APIs_V1.use('/auth', authRoute)

APIs_V1.use('/users', userRoute)

APIs_V1.use('/products', productRoute)

APIs_V1.use('/carts', cartRoute)

export default APIs_V1
