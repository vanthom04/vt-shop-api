"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _slideController = _interopRequireDefault(require("../../controllers/slideController"));
var slideRoute = _express["default"].Router();
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024
  }
});
var typeCreateNew = upload.fields([{
  name: 'title'
}, {
  name: 'imagePath'
}]);
slideRoute.route('/create-new').post(typeCreateNew, _slideController["default"].createNew);
slideRoute.route('/').get(_slideController["default"].getAllSlides);
var _default = exports["default"] = slideRoute;