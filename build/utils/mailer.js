"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _environment = _interopRequireDefault(require("../config/environment"));
var _verifyCodeModel = _interopRequireDefault(require("../models/verifyCodeModel"));
var sendMail = exports.sendMail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, username) {
    var verifyCode, transport, mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          verifyCode = Math.floor(100000 + Math.random() * 900000);
          transport = _nodemailer["default"].createTransport({
            service: 'gmail',
            auth: {
              user: _environment["default"].MAIL_USERNAME,
              pass: _environment["default"].MAIL_PASSWORD
            }
          });
          mailOptions = {
            from: {
              name: _environment["default"].APP_NAME,
              address: _environment["default"].MAIL_USERNAME
            },
            to: email,
            subject: 'Verify Email',
            html: "M\xE3 x\xE1c th\u1EF1c cho t\xE0i kho\u1EA3n <b>".concat(username, "</b> c\u1EE7a b\u1EA1n l\xE0: <b>").concat(verifyCode, "</b><br />\n          <b>L\u01B0u \xFD: </b> M\xE3 ch\u1EC9 c\xF3 hi\u1EC7u l\u1EF1c trong kho\u1EA3ng <b>15 ph\xFAt!</b>")
          };
          _context.next = 5;
          return _verifyCodeModel["default"].createNew({
            username: username,
            email: email,
            verifyCode: verifyCode
          });
        case 5:
          _context.next = 7;
          return transport.sendMail(mailOptions);
        case 7:
          return _context.abrupt("return", _context.sent);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendMail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();