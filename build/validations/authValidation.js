"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _httpStatusCodes = require("http-status-codes");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          correctCondition = _joi["default"].object({
            email: _joi["default"].string().required().trim().strict().email(),
            username: _joi["default"].string().required().min(3).max(20).trim().strict(),
            password: _joi["default"].string().required().min(6).max(100).trim().strict()
          });
          _context.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
          });
        case 4:
          next();
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(new _ApiError["default"](_httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY, _context.t0.message));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function registerUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          correctCondition = _joi["default"].object({
            username: _joi["default"].string().required().min(3).max(20).trim().strict(),
            password: _joi["default"].string().required().min(6).max(100).trim().strict()
          });
          _context2.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(new _ApiError["default"](_httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY, _context2.t0.message));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function loginUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var authValidation = {
  registerUser: registerUser,
  loginUser: loginUser
};
var _default = exports["default"] = authValidation;