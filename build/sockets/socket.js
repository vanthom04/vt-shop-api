"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _socket = _interopRequireDefault(require("socket.io"));
var _express = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
/* eslint-disable no-console */

// import env from '~/config/environment'

var app = (0, _express["default"])();
var server = _http["default"].createServer(app);
var io = (0, _socket["default"])(server);
io.on('connection', function (client) {
  console.log("Connection: ".concat(client));
  client.on('new_message', function (message) {
    console.log("New message: ".concat(message));
  });
});