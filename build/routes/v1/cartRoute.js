"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cartController = _interopRequireDefault(require("../../controllers/cartController"));
var cartRoute = _express["default"].Router();
cartRoute.route('/:userId').get(_cartController["default"].getCartByUserId);
cartRoute.route('/:userId/:productId/:quantity?').post(_cartController["default"].addProductToCart);
cartRoute.route('/:userId/:productId')["delete"](_cartController["default"].removeProductFromCart);
var _default = exports["default"] = cartRoute;