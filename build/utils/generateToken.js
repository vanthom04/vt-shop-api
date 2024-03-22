"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTokenAndSetCookie = exports.generateRefreshTokenAndSetCookie = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _environment = _interopRequireDefault(require("../config/environment"));
var generateTokenAndSetCookie = exports.generateTokenAndSetCookie = function generateTokenAndSetCookie(userId, res) {
  var token = _jsonwebtoken["default"].sign({
    userId: userId
  }, _environment["default"].JWT_SECRET_TOKEN_KEY, {
    expiresIn: '15d'
  });
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: _environment["default"].BUILD_MODE !== 'dev'
  });
};
var generateRefreshTokenAndSetCookie = exports.generateRefreshTokenAndSetCookie = function generateRefreshTokenAndSetCookie(userId, res) {
  var token = _jsonwebtoken["default"].sign({
    userId: userId
  }, _environment["default"].JWT_REFRESH_TOKEN_KEY, {
    expiresIn: '30d'
  });
  res.cookie('refreshToken', token, {
    maxAge: 12,
    httpOnly: true,
    sameSite: 'strict',
    secure: _environment["default"].BUILD_MODE !== 'dev'
  });
};