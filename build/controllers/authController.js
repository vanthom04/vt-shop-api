"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _authService = _interopRequireDefault(require("../services/authService"));
var registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _authService["default"].registerUser(req.body);
        case 3:
          user = _context.sent;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json({
            user: user
          });
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
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
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _authService["default"].loginUser(req.body);
        case 3:
          user = _context2.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            user: user
          });
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
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
var verifyCode = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var status;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _authService["default"].verifyCode(req.body);
        case 3:
          status = _context3.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(status);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function verifyCode(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var authController = {
  registerUser: registerUser,
  loginUser: loginUser,
  verifyCode: verifyCode
};
var _default = exports["default"] = authController;