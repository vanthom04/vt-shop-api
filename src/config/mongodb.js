import { MongoClient, ServerApiVersion } from 'mongodb'
import env from './environment'

let databaseInstance = null

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
    strict: true
  }
})

export const connectDB = async () => {
  await client.connect()
  databaseInstance = client.db(env.DATABASE_NAME)
}

export const closeDB = async () => {
  await client.close()
}

export const getDB = () => {
  if (!databaseInstance) throw new Error('Must connect to database!')
  return databaseInstance
}
