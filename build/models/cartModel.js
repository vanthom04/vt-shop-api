"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
var _validators = require("../utils/validators");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var cartCollectionName = 'carts';
var cartCollectionSchema = _joi["default"].object({
  userId: _joi["default"].string().required().pattern(_validators.OBJECT_ID_RULE).message(_validators.OBJECT_ID_RULE_MESSAGE),
  products: _joi["default"].array().items(_joi["default"].object({
    productId: _joi["default"].string().pattern(_validators.OBJECT_ID_RULE).message(_validators.OBJECT_ID_RULE_MESSAGE),
    name: _joi["default"].string().min(3).max(120).trim().strict(),
    imagePath: _joi["default"].string().trim().strict()["default"](null),
    price: _joi["default"].number(),
    quantity: _joi["default"].number()
  }))["default"]([]),
  //
  createdAt: _joi["default"].date().timestamp('javascript')["default"](Date.now()),
  updatedAt: _joi["default"].date().timestamp('javascript')["default"](null),
  _destroy: _joi["default"]["boolean"]()["default"](false)
});
var validateBeforeCreate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", cartCollectionSchema.validateAsync(data, {
            abortEarly: false
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
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
          return (0, _mongodb2.getDB)().collection(cartCollectionName).insertOne(_objectSpread(_objectSpread({}, validData), {}, {
            userId: new _mongodb.ObjectId(validData.userId)
          }));
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
var findOneById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _mongodb2.getDB)().collection(cartCollectionName).findOne({
            _id: new _mongodb.ObjectId(id)
          });
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
  return function findOneById(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var findOneByUserId = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _mongodb2.getDB)().collection(cartCollectionName).findOne({
            userId: new _mongodb.ObjectId(userId)
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
  return function findOneByUserId(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var addProductToCart = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId, item) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _mongodb2.getDB)().collection(cartCollectionName).findOneAndUpdate({
            userId: new _mongodb.ObjectId(userId)
          }, {
            $push: {
              products: {
                $each: [{
                  productId: new _mongodb.ObjectId(item.productId),
                  name: item.name,
                  imagePath: item.imagePath,
                  price: item.price,
                  quantity: item.quantity || 1
                }],
                $position: 0
              }
            }
          }, {
            returnDocument: 'after'
          });
        case 3:
          result = _context5.sent;
          return _context5.abrupt("return", result || {});
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          throw new Error(_context5.t0);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function addProductToCart(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
var updateProductCart = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userId, productId, quantity) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _mongodb2.getDB)().collection(cartCollectionName).findOneAndUpdate({
            userId: new _mongodb.ObjectId(userId),
            'products.productId': new _mongodb.ObjectId(productId)
          }, {
            $set: {
              'products.$.quantity': quantity
            }
          }, {
            returnDocument: 'after'
          });
        case 3:
          result = _context6.sent;
          return _context6.abrupt("return", result || {});
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          throw new Error(_context6.t0);
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function updateProductCart(_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
var removeProductFromCart = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(userId, productId) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _mongodb2.getDB)().collection(cartCollectionName).updateOne({
            userId: new _mongodb.ObjectId(userId)
          }, {
            $pull: {
              products: {
                productId: new _mongodb.ObjectId(productId)
              }
            }
          });
        case 3:
          return _context7.abrupt("return", _context7.sent);
        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          throw new Error(_context7.t0);
        case 9:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 6]]);
  }));
  return function removeProductFromCart(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();
var cartModel = {
  cartCollectionName: cartCollectionName,
  cartCollectionSchema: cartCollectionSchema,
  createNew: createNew,
  findOneById: findOneById,
  findOneByUserId: findOneByUserId,
  addProductToCart: addProductToCart,
  updateProductCart: updateProductCart,
  removeProductFromCart: removeProductFromCart
};
var _default = exports["default"] = cartModel;