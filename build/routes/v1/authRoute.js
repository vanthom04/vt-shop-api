"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _authValidation = _interopRequireDefault(require("../../validations/authValidation"));
var _authController = _interopRequireDefault(require("../../controllers/authController"));
var authRoute = _express["default"].Router();
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024
  }
});
var typeCreateNew = upload.fields([{
  name: 'fullName'
}, {
  name: 'username'
}, {
  name: 'email'
}, {
  name: 'password'
}, {
  name: 'imagePath'
}]);
authRoute.route('/create-new').post(typeCreateNew, _authValidation["default"].registerUser, _authController["default"].registerUser);
authRoute.route('/register').post(_authValidation["default"].registerUser, _authController["default"].registerUser);
authRoute.route('/login').post(_authValidation["default"].loginUser, _authController["default"].loginUser);
authRoute.route('/verify').post(_authController["default"].verifyCode);
authRoute.route('/logout').post();
var _default = exports["default"] = authRoute;