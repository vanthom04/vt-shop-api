"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
//import siteService from '~/services/siteService'

var index = function index(req, res, next) {
  try {
    res.status(_httpStatusCodes.StatusCodes.OK).json({
      status: _httpStatusCodes.StatusCodes.OK,
      message: 'Server VT Shop'
    });
  } catch (error) {
    next(error);
  }
};
var search = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function search() {
    return _ref.apply(this, arguments);
  };
}();
var siteService = {
  index: index,
  search: search
};
var _default = exports["default"] = siteService;