"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../../controllers/userController"));
var userRoute = _express["default"].Router();
userRoute.route('/').get(_userController["default"].getAllUsers);
userRoute.route('/:id').get(_userController["default"].getUserById).put();
var _default = exports["default"] = userRoute;