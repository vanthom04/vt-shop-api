import { StatusCodes } from 'http-status-codes'

import { WHITELIST_DOMAINS } from '~/utils/constants'
import ApiError from '~/utils/ApiError'
import env from './environment'

export const corsOptions = {
  origin(origin, callback) {
    if (env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    // Kiểm tra dem origin có phải là domain được chấp nhận hay không
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
    return callback(
      new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`)
    )
  },
  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS sẽ cho phép nhận cookies từ request
  credentials: true
}
