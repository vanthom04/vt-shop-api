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
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _uuidV = _interopRequireDefault(require("uuid-v4"));
var firebaseAdmin = _interopRequireWildcard(require("../config/firebaseAdmin"));
var _verifyCodeModel = _interopRequireDefault(require("../models/verifyCodeModel"));
var _cartModel = _interopRequireDefault(require("../models/cartModel"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _mailer = require("../utils/mailer");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// import { isVerifyCodeValid } from '~/utils/constants'

var createNewUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var _req$files, _req$body, username, email, password, imagePath, uniqueId, existingUser, slat, hashPassword, folders, type, fileName, createdUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          imagePath = ((_req$files = req.files) === null || _req$files === void 0 ? void 0 : _req$files.imagePath[0]) || {};
          uniqueId = (0, _uuidV["default"])();
          _context.next = 6;
          return _userModel["default"].checkDuplicate(username, email);
        case 6:
          existingUser = _context.sent;
          if (!existingUser) {
            _context.next = 9;
            break;
          }
          throw new _ApiError["default"](_httpStatusCodes.StatusCodes.CONFLICT, 'Username or email already exists!');
        case 9:
          _context.next = 11;
          return _bcryptjs["default"].genSalt(10);
        case 11:
          slat = _context.sent;
          _context.next = 14;
          return _bcryptjs["default"].hash(password, slat);
        case 14:
          hashPassword = _context.sent;
          folders = [_userModel["default"].userCollectionName].join('/');
          type = imagePath === null || imagePath === void 0 ? void 0 : imagePath.mimetype.split('/')[1];
          fileName = "".concat(folders, "/").concat(username, "-").concat(uniqueId, ".").concat(type);
          _context.next = 20;
          return _userModel["default"].createNew(_objectSpread(_objectSpread({}, req.body), {}, {
            password: hashPassword,
            imagePath: fileName
          }));
        case 20:
          createdUser = _context.sent;
          _context.next = 23;
          return firebaseAdmin.uploadFile(imagePath, fileName);
        case 23:
          _context.next = 25;
          return _cartModel["default"].createNew({
            userId: createdUser.insertedId.toString()
          });
        case 25:
          _context.next = 27;
          return _userModel["default"].findOneById(createdUser.insertedId);
        case 27:
          return _context.abrupt("return", _context.sent);
        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 33:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 30]]);
  }));
  return function createNewUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
var registerUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(reqBody) {
    var username, email, password, existingUser, slat, hashPassword, createdUser, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          username = reqBody.username, email = reqBody.email, password = reqBody.password;
          _context2.next = 4;
          return _userModel["default"].checkDuplicate(username, email);
        case 4:
          existingUser = _context2.sent;
          if (!existingUser) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", {
            success: false,
            message: 'Username or email already exists!'
          });
        case 7:
          _context2.next = 9;
          return _bcryptjs["default"].genSalt(10);
        case 9:
          slat = _context2.sent;
          _context2.next = 12;
          return _bcryptjs["default"].hash(password, slat);
        case 12:
          hashPassword = _context2.sent;
          _context2.next = 15;
          return _userModel["default"].createNew(_objectSpread(_objectSpread({}, reqBody), {}, {
            password: hashPassword
          }));
        case 15:
          createdUser = _context2.sent;
          _context2.next = 18;
          return _cartModel["default"].createNew({
            userId: createdUser.insertedId.toString()
          });
        case 18:
          _context2.next = 20;
          return (0, _mailer.sendMail)(email, username);
        case 20:
          _context2.next = 22;
          return _userModel["default"].findOneById(createdUser.insertedId);
        case 22:
          user = _context2.sent;
          return _context2.abrupt("return", _objectSpread(_objectSpread({}, user), {}, {
            success: true
          }));
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 29:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 26]]);
  }));
  return function registerUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var verifyCode = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(reqBody) {
    var _verifyCode, code, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _verifyCode = reqBody.verifyCode;
          if (_verifyCode) {
            _context3.next = 4;
            break;
          }
          throw new _ApiError["default"](_httpStatusCodes.StatusCodes.NOT_FOUND, 'No verify code!');
        case 4:
          _context3.next = 6;
          return _verifyCodeModel["default"].findOne(+_verifyCode);
        case 6:
          code = _context3.sent;
          if (code) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", {
            success: false,
            message: 'Invalid code!'
          });
        case 9:
          _context3.next = 11;
          return _userModel["default"].findOneByUsername(code.username);
        case 11:
          user = _context3.sent;
          if (user) {
            _context3.next = 14;
            break;
          }
          throw new _ApiError["default"](_httpStatusCodes.StatusCodes.NOT_FOUND, 'Invalid username!');
        case 14:
          if (user.isActive) {
            _context3.next = 17;
            break;
          }
          _context3.next = 17;
          return _userModel["default"].verifyCode(user.username);
        case 17:
          return _context3.abrupt("return", {
            userId: user._id,
            status: _httpStatusCodes.StatusCodes.OK,
            success: true,
            message: 'Verify account successfully!'
          });
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 23:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return function verifyCode(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var loginUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(reqBody) {
    var username, password, user, validPassword, fileName;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          username = reqBody.username, password = reqBody.password;
          _context4.next = 4;
          return _userModel["default"].findOneByUsername(username);
        case 4:
          user = _context4.sent;
          _context4.next = 7;
          return _bcryptjs["default"].compare(password, (user === null || user === void 0 ? void 0 : user.password) || '');
        case 7:
          validPassword = _context4.sent;
          if (!(!user || !validPassword)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", {
            status: false,
            message: 'Invalid username or password!'
          });
        case 10:
          if (user.isActive) {
            _context4.next = 14;
            break;
          }
          _context4.next = 13;
          return (0, _mailer.sendMail)(user.email, user.username);
        case 13:
          return _context4.abrupt("return", {
            status: true,
            isActive: false,
            message: 'Account is not active!'
          });
        case 14:
          if (!(user && user.isActive && validPassword)) {
            _context4.next = 30;
            break;
          }
          fileName = user === null || user === void 0 ? void 0 : user.imagePath;
          _context4.t0 = user._id;
          _context4.t1 = user.fullName;
          _context4.t2 = user.username;
          _context4.t3 = user.email;
          _context4.t4 = user.role;
          if (!fileName) {
            _context4.next = 27;
            break;
          }
          _context4.next = 24;
          return firebaseAdmin.getImageURLByName(fileName);
        case 24:
          _context4.t5 = _context4.sent;
          _context4.next = 28;
          break;
        case 27:
          _context4.t5 = '';
        case 28:
          _context4.t6 = _context4.t5;
          return _context4.abrupt("return", {
            status: true,
            isActive: true,
            userId: _context4.t0,
            fullName: _context4.t1,
            username: _context4.t2,
            email: _context4.t3,
            role: _context4.t4,
            photoURL: _context4.t6
          });
        case 30:
          _context4.next = 35;
          break;
        case 32:
          _context4.prev = 32;
          _context4.t7 = _context4["catch"](0);
          throw _context4.t7;
        case 35:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 32]]);
  }));
  return function loginUser(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var authService = {
  createNewUser: createNewUser,
  registerUser: registerUser,
  loginUser: loginUser,
  verifyCode: verifyCode
};
var _default = exports["default"] = authService;