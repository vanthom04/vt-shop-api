import firebaseAdmin from 'firebase-admin'

import env from './environment'

const serviceAccount = {
  type: env.TYPE,
  project_id: env.PROJECT_ID,
  private_key_id: env.PRIVATE_KEY_ID,
  private_key: env.PRIVATE_KEY,
  client_email: env.CLIENT_EMAIL,
  client_id: env.CLIENT_ID,
  auth_uri: env.AUTH_URI,
  token_uri: env.TOKEN_URI,
  auth_provider_x509_cert_url: env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: env.CLIENT_X509_CERT_URL,
  universe_domain: env.UNIVERSE_DOMAIN
}

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: 'gs://vt-shop-65df4.appspot.com'
})

const bucket = firebaseAdmin.storage().bucket()

export const uploadFile = async (file, fileName) => {
  try {
    const fileBuffer = file.buffer
    // const fileName = `${folders.join('/')}/${name}-${uniqueId}.${file.mimetype.split('/')[1]}`

    const fileUpload = bucket.file(fileName)
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })

    stream.on('error', (error) => {
      throw new Error('Error uploading file: ' + error.message)
    })

    stream.end(fileBuffer)
    return fileName
  } catch (error) {
    throw new Error('Error uploading file: ' + error.message)
  }
}

export const getImageURLByName = async (fileName) => {
  try {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 15)

    const file = bucket.file(fileName)
    const url = await file.getSignedUrl({
      action: 'read',
      expires: expirationDate
    })

    return url[0]
  } catch (error) {
    throw new Error(error)
  }
}

export default firebaseAdmin
