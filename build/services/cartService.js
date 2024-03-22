"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _lodash = require("lodash");
var firebaseAdmin = _interopRequireWildcard(require("../config/firebaseAdmin"));
var _cartModel = _interopRequireDefault(require("../models/cartModel"));
var _productModel = _interopRequireDefault(require("../models/productModel"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(reqBody) {
    var newCart, createdCart;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newCart = _objectSpread({}, reqBody);
          _context.next = 4;
          return _cartModel["default"].createNew(newCart);
        case 4:
          createdCart = _context.sent;
          _context.next = 7;
          return _cartModel["default"].findOneById(createdCart.insertedId);
        case 7:
          return _context.abrupt("return", _context.sent);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function createNew(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getCartByUserId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    var cart, totalPrice, newProducts, products, _iterator, _step, product, fileName;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _cartModel["default"].findOneByUserId(userId);
        case 3:
          cart = _context2.sent;
          if (cart) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", {});
        case 6:
          totalPrice = cart.products.reduce(function (acc, curr) {
            return acc + curr.price * curr.quantity;
          }, 0);
          newProducts = (0, _lodash.cloneDeep)(cart.products);
          products = [];
          _iterator = _createForOfIteratorHelper(newProducts);
          _context2.prev = 10;
          _iterator.s();
        case 12:
          if ((_step = _iterator.n()).done) {
            _context2.next = 31;
            break;
          }
          product = _step.value;
          fileName = product === null || product === void 0 ? void 0 : product.imagePath;
          product === null || product === void 0 || delete product.imagePath;
          _context2.t0 = products;
          _context2.t1 = _objectSpread;
          _context2.t2 = _objectSpread({}, product);
          _context2.t3 = {};
          _context2.next = 22;
          return firebaseAdmin.getImageURLByName(fileName);
        case 22:
          _context2.t4 = _context2.sent;
          if (_context2.t4) {
            _context2.next = 25;
            break;
          }
          _context2.t4 = '';
        case 25:
          _context2.t5 = _context2.t4;
          _context2.t6 = {
            thumbnail: _context2.t5
          };
          _context2.t7 = (0, _context2.t1)(_context2.t2, _context2.t3, _context2.t6);
          _context2.t0.push.call(_context2.t0, _context2.t7);
        case 29:
          _context2.next = 12;
          break;
        case 31:
          _context2.next = 36;
          break;
        case 33:
          _context2.prev = 33;
          _context2.t8 = _context2["catch"](10);
          _iterator.e(_context2.t8);
        case 36:
          _context2.prev = 36;
          _iterator.f();
          return _context2.finish(36);
        case 39:
          return _context2.abrupt("return", _objectSpread(_objectSpread({}, cart), {}, {
            products: products,
            totalPrice: totalPrice,
            totalProducts: cart.products.length
          }));
        case 42:
          _context2.prev = 42;
          _context2.t9 = _context2["catch"](0);
          throw _context2.t9;
        case 45:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 42], [10, 33, 36, 39]]);
  }));
  return function getCartByUserId(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var addProductToCart = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(reqParams) {
    var userId, productId, quantity, product, userCart, products, productItemCart, total;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = reqParams.userId, productId = reqParams.productId, quantity = reqParams.quantity;
          _context3.next = 4;
          return _productModel["default"].findOneById(productId);
        case 4:
          product = _context3.sent;
          _context3.next = 7;
          return _cartModel["default"].findOneByUserId(userId);
        case 7:
          userCart = _context3.sent;
          if (!(!userCart || !product)) {
            _context3.next = 10;
            break;
          }
          throw new _ApiError["default"](_httpStatusCodes.StatusCodes.NOT_FOUND, 'User or product not found!');
        case 10:
          products = (0, _lodash.cloneDeep)(userCart.products);
          _context3.next = 13;
          return products.find(function (product) {
            return product.productId.toString() === productId;
          });
        case 13:
          productItemCart = _context3.sent;
          if (!productItemCart) {
            _context3.next = 21;
            break;
          }
          total = !quantity ? productItemCart.quantity + 1 : productItemCart.quantity + parseInt(quantity);
          _context3.next = 18;
          return _cartModel["default"].updateProductCart(userId, productId, total);
        case 18:
          return _context3.abrupt("return", _context3.sent);
        case 21:
          _context3.next = 23;
          return _cartModel["default"].addProductToCart(userId, {
            productId: product._id,
            name: product.name,
            imagePath: product.imagePath,
            price: product.price,
            quantity: parseInt(quantity)
          });
        case 23:
          return _context3.abrupt("return", _context3.sent);
        case 24:
          _context3.next = 29;
          break;
        case 26:
          _context3.prev = 26;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 29:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 26]]);
  }));
  return function addProductToCart(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var removeProductFromCart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(reqParams) {
    var userId, productId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = reqParams.userId, productId = reqParams.productId;
          _context4.next = 4;
          return _cartModel["default"].removeProductFromCart(userId, productId);
        case 4:
          return _context4.abrupt("return", _context4.sent);
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function removeProductFromCart(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var cartService = {
  createNew: createNew,
  getCartByUserId: getCartByUserId,
  addProductToCart: addProductToCart,
  removeProductFromCart: removeProductFromCart
};
var _default = exports["default"] = cartService;