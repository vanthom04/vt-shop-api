import jwt from 'jsonwebtoken'
import env from '~/config/environment'

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, env.JWT_SECRET_TOKEN_KEY, {
    expiresIn: '15d'
  })

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: env.BUILD_MODE !== 'dev'
  })
}

export const generateRefreshTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, env.JWT_REFRESH_TOKEN_KEY, {
    expiresIn: '30d'
  })

  res.cookie('refreshToken', token, {
    maxAge: 12,
    httpOnly: true,
    sameSite: 'strict',
    secure: env.BUILD_MODE !== 'dev'
  })
}
