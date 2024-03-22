/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import env from '~/config/environment'

export const errorHandlingMiddleware = (err, req, res, next) => {
  // Nếu dev không cận thận thiếu statusCode thì mặc định code sẽ là 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    stack: err.stack
  }

  // Chỉ môi trường dev thì mới để stack còn không thì xóa đi
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // Trả responseError về phía FE
  res.status(responseError.statusCode).json(responseError)
}
