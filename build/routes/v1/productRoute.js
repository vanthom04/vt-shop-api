"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _productValidation = _interopRequireDefault(require("../../validations/productValidation"));
var _productController = _interopRequireDefault(require("../../controllers/productController"));
var productRoute = _express["default"].Router();
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024
  }
});
var typeCreateProduct = upload.fields([{
  name: 'name'
}, {
  name: 'brand'
}, {
  name: 'description'
}, {
  name: 'price'
}, {
  name: 'stockQuantity'
}, {
  name: 'category'
}, {
  name: 'warranty'
}, {
  name: 'featured'
}, {
  name: 'specifications'
}, {
  name: 'imagePath'
}]);
productRoute.route('/create-new').post(typeCreateProduct, _productValidation["default"].createNew, _productController["default"].createNew);
productRoute.route('/:id').get(_productController["default"].getProductById).put(function (req, res) {
  res.json({});
});
productRoute.route('/').get(_productController["default"].getAllProducts);
var _default = exports["default"] = productRoute;