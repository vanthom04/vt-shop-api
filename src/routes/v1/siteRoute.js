import express from 'express'

import siteService from '~/controllers/siteController'
import verifyCodeModel from '~/models/verifyCodeModel'
import { sendMail } from '~/utils/mailer'

const siteRoute = express.Router()

function isVerifyCodeValid(savedTimestamp, expirationTime) {
  const currentTimestamp = Date.now()
  const timeDifference = currentTimestamp - savedTimestamp

  return timeDifference <= expirationTime
}

siteRoute
  .route('/')
  .get(siteService.index)

siteRoute
  .route('/verify')
  .post(async (req, res) => {
    const { verifyCode } = req.body

    const code = await verifyCodeModel.findOne(+verifyCode)
    if (code) {
      const isValidCode = isVerifyCodeValid(code.createdAt, 15 * 60 * 1000)
      if (isValidCode) {
        res.status(200).json({ message: 'Successfully!' })
      } else {
        res.json({ message: 'Invalid code!' })
      }
    } else {
      res.status(404).json({ message: 'Invalid code!' })
    }
  })

siteRoute
  .route('/send-mail')
  .post(async (req, res) => {
    const { email } = req.body

    if (email) {
      const verifyCode = Math.floor(100000 + Math.random() * 900000)
      await verifyCodeModel.createNew({ verifyCode })
      await sendMail(email, verifyCode)
      return res.status(200).json({ message: 'Send mail Successfully!' })
    }
    res.status(500).json({ message: 'Error' })
  })

export default siteRoute