"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _siteRoute = _interopRequireDefault(require("./siteRoute"));
var _slideRoute = _interopRequireDefault(require("./slideRoute"));
var _authRoute = _interopRequireDefault(require("./authRoute"));
var _userRoute = _interopRequireDefault(require("./userRoute"));
var _productRoute = _interopRequireDefault(require("./productRoute"));
var _cartRoute = _interopRequireDefault(require("./cartRoute"));
var APIs_V1 = _express["default"].Router();
APIs_V1.use('/', _siteRoute["default"]);
APIs_V1.use('/slides', _slideRoute["default"]);
APIs_V1.use('/auth', _authRoute["default"]);
APIs_V1.use('/users', _userRoute["default"]);
APIs_V1.use('/products', _productRoute["default"]);
APIs_V1.use('/carts', _cartRoute["default"]);
var _default = exports["default"] = APIs_V1;