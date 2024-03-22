"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _siteController = _interopRequireDefault(require("../../controllers/siteController"));
var _verifyCodeModel = _interopRequireDefault(require("../../models/verifyCodeModel"));
var _mailer = require("../../utils/mailer");
var siteRoute = _express["default"].Router();
function isVerifyCodeValid(savedTimestamp, expirationTime) {
  var currentTimestamp = Date.now();
  var timeDifference = currentTimestamp - savedTimestamp;
  return timeDifference <= expirationTime;
}
siteRoute.route('/').get(_siteController["default"].index);
siteRoute.route('/verify').post( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var verifyCode, code, isValidCode;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          verifyCode = req.body.verifyCode;
          _context.next = 3;
          return _verifyCodeModel["default"].findOne(+verifyCode);
        case 3:
          code = _context.sent;
          if (code) {
            isValidCode = isVerifyCodeValid(code.createdAt, 15 * 60 * 1000);
            if (isValidCode) {
              res.status(200).json({
                message: 'Successfully!'
              });
            } else {
              res.json({
                message: 'Invalid code!'
              });
            }
          } else {
            res.status(404).json({
              message: 'Invalid code!'
            });
          }
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
siteRoute.route('/send-mail').post( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var email, verifyCode;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          if (!email) {
            _context2.next = 8;
            break;
          }
          verifyCode = Math.floor(100000 + Math.random() * 900000);
          _context2.next = 5;
          return _verifyCodeModel["default"].createNew({
            verifyCode: verifyCode
          });
        case 5:
          _context2.next = 7;
          return (0, _mailer.sendMail)(email, verifyCode);
        case 7:
          return _context2.abrupt("return", res.status(200).json({
            message: 'Send mail Successfully!'
          }));
        case 8:
          res.status(500).json({
            message: 'Error'
          });
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = exports["default"] = siteRoute;