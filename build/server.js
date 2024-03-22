"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _asyncExitHook = _interopRequireDefault(require("async-exit-hook"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _v = _interopRequireDefault(require("./routes/v1"));
var _environment = _interopRequireDefault(require("./config/environment"));
var _cors2 = require("./config/cors");
var _mongodb = require("./config/mongodb");
var _errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");
/* eslint-disable no-console */

var startServer = function startServer() {
  var app = (0, _express["default"])();
  app.use((0, _morgan["default"])('dev'));
  app.use((0, _cookieParser["default"])());
  app.use((0, _cors["default"])(_cors2.corsOptions));
  app.use(_express["default"].json({
    limit: '5mb'
  }));
  app.use(_express["default"].urlencoded({
    extended: true,
    limit: '5mb'
  }));

  // config routes
  app.use('/api/v1', _v["default"]);

  // error handling
  app.use(_errorHandlingMiddleware.errorHandlingMiddleware);
  if (_environment["default"].BUILD_MODE === 'dev') {
    app.listen(_environment["default"].APP_PORT, function () {
      console.log("Server listening on http://".concat(_environment["default"].APP_HOST, ":").concat(_environment["default"].APP_PORT, "/api/v1"));
    });
  } else {
    app.listen(process.env.PORT, function () {
      console.log("Server listening on http://".concat(_environment["default"].APP_HOST, ":").concat(process.env.PORT));
    });
  }
  (0, _asyncExitHook["default"])(function () {
    return (0, _mongodb.closeDB)();
  });
};
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return (0, _mongodb.connectDB)();
      case 3:
        console.log('Connected to MongoDB!');
        startServer();
        _context.next = 11;
        break;
      case 7:
        _context.prev = 7;
        _context.t0 = _context["catch"](0);
        console.log(_context.t0);
        process.exit(0);
      case 11:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 7]]);
}))();