"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBJECT_ID_RULE_MESSAGE = exports.OBJECT_ID_RULE = void 0;
var OBJECT_ID_RULE = exports.OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/;
var OBJECT_ID_RULE_MESSAGE = exports.OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern!';