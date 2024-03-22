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
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var users, newUsers, resUsers, _iterator, _step, user, imagePath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _userModel["default"].getAllUsers();
        case 3:
          users = _context.sent;
          if (!(users.length === 0)) {
            _context.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatusCodes.StatusCodes.NOT_FOUND, 'Users not found!');
        case 6:
          newUsers = (0, _lodash.cloneDeep)(users);
          resUsers = [];
          _iterator = _createForOfIteratorHelper(newUsers);
          _context.prev = 9;
          _iterator.s();
        case 11:
          if ((_step = _iterator.n()).done) {
            _context.next = 32;
            break;
          }
          user = _step.value;
          imagePath = user === null || user === void 0 ? void 0 : user.imagePath;
          user === null || user === void 0 || delete user.imagePath;
          _context.t0 = resUsers;
          _context.t1 = _objectSpread;
          _context.t2 = _objectSpread({}, user);
          _context.t3 = {};
          if (!imagePath) {
            _context.next = 25;
            break;
          }
          _context.next = 22;
          return firebaseAdmin.getImageURLByName(imagePath);
        case 22:
          _context.t4 = _context.sent;
          _context.next = 26;
          break;
        case 25:
          _context.t4 = null;
        case 26:
          _context.t5 = _context.t4;
          _context.t6 = {
            photoURL: _context.t5
          };
          _context.t7 = (0, _context.t1)(_context.t2, _context.t3, _context.t6);
          _context.t0.push.call(_context.t0, _context.t7);
        case 30:
          _context.next = 11;
          break;
        case 32:
          _context.next = 37;
          break;
        case 34:
          _context.prev = 34;
          _context.t8 = _context["catch"](9);
          _iterator.e(_context.t8);
        case 37:
          _context.prev = 37;
          _iterator.f();
          return _context.finish(37);
        case 40:
          return _context.abrupt("return", resUsers);
        case 43:
          _context.prev = 43;
          _context.t9 = _context["catch"](0);
          throw _context.t9;
        case 46:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 43], [9, 34, 37, 40]]);
  }));
  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}();
var getUserById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    var user, resUser, imagePath;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _userModel["default"].findOneById(userId);
        case 3:
          user = _context2.sent;
          if (user) {
            _context2.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatusCodes.StatusCodes.NOT_FOUND, 'User not found!');
        case 6:
          resUser = (0, _lodash.cloneDeep)(user);
          imagePath = resUser === null || resUser === void 0 ? void 0 : resUser.imagePath;
          resUser === null || resUser === void 0 || delete resUser.imagePath;
          _context2.t0 = _objectSpread;
          _context2.t1 = _objectSpread({}, resUser);
          _context2.t2 = {};
          if (!imagePath) {
            _context2.next = 18;
            break;
          }
          _context2.next = 15;
          return firebaseAdmin.getImageURLByName(imagePath);
        case 15:
          _context2.t3 = _context2.sent;
          _context2.next = 19;
          break;
        case 18:
          _context2.t3 = '';
        case 19:
          _context2.t4 = _context2.t3;
          _context2.t5 = {
            photoURL: _context2.t4
          };
          return _context2.abrupt("return", (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t5));
        case 24:
          _context2.prev = 24;
          _context2.t6 = _context2["catch"](0);
          throw _context2.t6;
        case 27:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 24]]);
  }));
  return function getUserById(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var userService = {
  getAllUsers: getAllUsers,
  getUserById: getUserById
};
var _default = exports["default"] = userService;