"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
var productCollectionName = 'products';
var productCollectionSchema = _joi["default"].object({
  name: _joi["default"].string().required().min(6).max(200).trim().strict(),
  slug: _joi["default"].string().required().min(1).trim().strict(),
  brand: _joi["default"].string().required().trim().strict(),
  description: _joi["default"].string().trim().strict(),
  price: _joi["default"].number().required(),
  stockQuantity: _joi["default"].number().required(),
  imagePath: _joi["default"].string().trim().strict()["default"](null),
  category: _joi["default"].string().trim().strict(),
  rating: _joi["default"].number()["default"](0),
  warranty: _joi["default"].string().trim().strict(),
  featured: _joi["default"]["boolean"]()["default"](false),
  status: _joi["default"].string().trim().strict(),
  // Thông số kỹ thuật
  specifications: _joi["default"].object({
    cpu: _joi["default"].string(),
    ram: _joi["default"].string(),
    storage: _joi["default"].string(),
    graphicCard: _joi["default"].string(),
    display: _joi["default"].string(),
    audio: _joi["default"].string(),
    webcam: _joi["default"].string(),
    portConnection: _joi["default"].string(),
    wirelessConnectivity: _joi["default"].string(),
    weight: _joi["default"].string(),
    size: _joi["default"].string(),
    pin: _joi["default"].string(),
    color: _joi["default"].string()
  })["default"]({}),
  //
  createdAt: _joi["default"].date().timestamp('javascript')["default"](Date.now),
  updatedAt: _joi["default"].date().timestamp('javascript')["default"](null),
  _destroy: _joi["default"]["boolean"]()["default"](false)
});
var validateBeforeCreate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return productCollectionSchema.validateAsync(data, {
            abortEarly: false
          });
        case 3:
          return _context.abrupt("return", _context.sent);
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function validateBeforeCreate(_x) {
    return _ref.apply(this, arguments);
  };
}();
var createNew = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var validData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return validateBeforeCreate(data);
        case 3:
          validData = _context2.sent;
          _context2.next = 6;
          return (0, _mongodb2.getDB)().collection(productCollectionName).insertOne(validData);
        case 6:
          return _context2.abrupt("return", _context2.sent);
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function createNew(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllProducts = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _mongodb2.getDB)().collection(productCollectionName).find().sort({
            createdAt: -1
          }).toArray();
        case 3:
          return _context3.abrupt("return", _context3.sent);
        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          throw new Error(_context3.t0);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return function getAllProducts() {
    return _ref3.apply(this, arguments);
  };
}();
var findOneById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _mongodb2.getDB)().collection(productCollectionName).findOne({
            _id: new _mongodb.ObjectId(id)
          });
        case 3:
          return _context4.abrupt("return", _context4.sent);
        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0);
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 6]]);
  }));
  return function findOneById(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
var productModel = {
  productCollectionName: productCollectionName,
  productCollectionSchema: productCollectionSchema,
  createNew: createNew,
  getAllProducts: getAllProducts,
  findOneById: findOneById
};
var _default = exports["default"] = productModel;