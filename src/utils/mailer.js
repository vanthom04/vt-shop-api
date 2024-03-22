import nodemailer from 'nodemailer'
import env from '~/config/environment'

import verifyCodeModel from '~/models/verifyCodeModel'

export const sendMail = async (email, username) => {
  const verifyCode = Math.floor(100000 + Math.random() * 900000)

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.MAIL_USERNAME,
      pass: env.MAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: {
      name: env.APP_NAME,
      address: env.MAIL_USERNAME
    },
    to: email,
    subject: 'Verify Email',
    html: `Mã xác thực cho tài khoản <b>${username}</b> của bạn là: <b>${verifyCode}</b><br />
          <b>Lưu ý: </b> Mã chỉ có hiệu lực trong khoảng <b>15 phút!</b>`
  }

  await verifyCodeModel.createNew({ username, email, verifyCode })
  return await transport.sendMail(mailOptions)
}
