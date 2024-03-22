"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
var userCollectionName = 'users';
var userCollectionSchema = _joi["default"].object({
  fullName: _joi["default"].string().max(50).trim().strict()["default"](''),
  username: _joi["default"].string().min(3).max(20).trim().strict(),
  email: _joi["default"].string().max(50).email().trim().strict(),
  password: _joi["default"].string().min(6).max(100).required().trim().strict(),
  imagePath: _joi["default"].string().trim().strict()["default"](null),
  //
  role: _joi["default"].string().trim().strict()["default"]('client'),
  isActive: _joi["default"]["boolean"]()["default"](false),
  //
  createdAt: _joi["default"].date().timestamp('javascript')["default"](Date.now),
  updatedAt: _joi["default"].date().timestamp('javascript')["default"](null),
  _destroy: _joi["default"]["boolean"]()["default"](false)
});
var validateBeforeCreate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return userCollectionSchema.validateAsync(data, {
            abortEarly: false
          });
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
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
          return (0, _mongodb2.getDB)().collection(userCollectionName).insertOne(validData);
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
var checkDuplicate = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(username, email) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
            $or: [{
              username: username
            }, {
              email: email
            }]
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
  return function checkDuplicate(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var verifyCode = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(username) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).updateOne({
            username: username,
            isActive: false
          }, {
            $set: {
              isActive: true
            }
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
  return function verifyCode(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var findOneByUsername = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(username) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
            username: username
          });
        case 3:
          return _context5.abrupt("return", _context5.sent);
        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          throw new Error(_context5.t0);
        case 9:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 6]]);
  }));
  return function findOneByUsername(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var findOneById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
            _id: new _mongodb.ObjectId(id)
          });
        case 3:
          return _context6.abrupt("return", _context6.sent);
        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          throw new Error(_context6.t0);
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 6]]);
  }));
  return function findOneById(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
var getAllUsers = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).find().toArray();
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
  return function getAllUsers() {
    return _ref7.apply(this, arguments);
  };
}();
var userModel = {
  userCollectionName: userCollectionName,
  userCollectionSchema: userCollectionSchema,
  createNew: createNew,
  checkDuplicate: checkDuplicate,
  findOneByUsername: findOneByUsername,
  findOneById: findOneById,
  getAllUsers: getAllUsers,
  verifyCode: verifyCode
};
var _default = exports["default"] = userModel;