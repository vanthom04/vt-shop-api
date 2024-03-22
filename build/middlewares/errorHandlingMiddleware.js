"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandlingMiddleware = void 0;
var _httpStatusCodes = require("http-status-codes");
var _environment = _interopRequireDefault(require("../config/environment"));
/* eslint-disable no-unused-vars */

var errorHandlingMiddleware = exports.errorHandlingMiddleware = function errorHandlingMiddleware(err, req, res, next) {
  // Nếu dev không cận thận thiếu statusCode thì mặc định code sẽ là 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;

  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  var responseError = {
    statusCode: err.statusCode,
    message: err.message || _httpStatusCodes.StatusCodes[err.statusCode],
    // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    stack: err.stack
  };

  // Chỉ môi trường dev thì mới để stack còn không thì xóa đi
  if (_environment["default"].BUILD_MODE !== 'dev') delete responseError.stack;

  // Trả responseError về phía FE
  res.status(responseError.statusCode).json(responseError);
};