/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import exitHook from 'async-exit-hook'
import cookieParser from 'cookie-parser'

import APIs_V1 from '~/routes/v1'
import env from '~/config/environment'
import { corsOptions } from '~/config/cors'
import { connectDB, closeDB } from '~/config/mongodb'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const startServer = () => {
  const app = express()

  app.use(morgan('dev'))
  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use(express.json({ limit: '5mb' }))
  app.use(express.urlencoded({ extended: true, limit: '5mb' }))

  // config routes
  app.use('/api/v1', APIs_V1)

  // error handling
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'dev') {
    app.listen(env.APP_PORT, () => {
      console.log(`Server listening on http://${env.APP_HOST}:${env.APP_PORT}/api/v1`)
    })
  } else {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on http://${env.APP_HOST}:${process.env.PORT}`)
    })
  }

  exitHook(() => closeDB())
}

(async () => {
  try {
    await connectDB()
    console.log('Connected to MongoDB!')
    startServer()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
