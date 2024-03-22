"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDB = exports.connectDB = exports.closeDB = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongodb = require("mongodb");
var _environment = _interopRequireDefault(require("./environment"));
var databaseInstance = null;
var client = new _mongodb.MongoClient(_environment["default"].MONGODB_URI, {
  serverApi: {
    version: _mongodb.ServerApiVersion.v1,
    deprecationErrors: true,
    strict: true
  }
});
var connectDB = exports.connectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return client.connect();
        case 2:
          databaseInstance = client.db(_environment["default"].DATABASE_NAME);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function connectDB() {
    return _ref.apply(this, arguments);
  };
}();
var closeDB = exports.closeDB = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return client.close();
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function closeDB() {
    return _ref2.apply(this, arguments);
  };
}();
var getDB = exports.getDB = function getDB() {
  if (!databaseInstance) throw new Error('Must connect to database!');
  return databaseInstance;
};