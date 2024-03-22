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
var _lodash = require("lodash");
var _uuidV = _interopRequireDefault(require("uuid-v4"));
var firebaseAdmin = _interopRequireWildcard(require("../config/firebaseAdmin"));
var _slideModel = _interopRequireDefault(require("../models/slideModel"));
var _formatters = require("../utils/formatters");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var _req$files, uniqueId, reqBody, imagePath, folders, type, fileName, createdSlide;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          uniqueId = (0, _uuidV["default"])();
          reqBody = _objectSpread(_objectSpread({}, req.body), {}, {
            slug: (0, _formatters.slugify)(req.body.title)
          });
          imagePath = (_req$files = req.files) === null || _req$files === void 0 ? void 0 : _req$files.imagePath[0];
          folders = [_slideModel["default"].slideCollectionName].join('/');
          type = imagePath === null || imagePath === void 0 ? void 0 : imagePath.mimetype.split('/')[1];
          fileName = "".concat(folders, "/").concat(reqBody.slug, "-").concat(uniqueId, ".").concat(type);
          _context.next = 9;
          return _slideModel["default"].createNew(_objectSpread(_objectSpread({}, reqBody), {}, {
            imagePath: fileName
          }));
        case 9:
          createdSlide = _context.sent;
          _context.next = 12;
          return firebaseAdmin.uploadFile(imagePath, fileName);
        case 12:
          _context.next = 14;
          return _slideModel["default"].findOneById(createdSlide.insertedId);
        case 14:
          return _context.abrupt("return", _context.sent);
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function createNew(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getAllSlides = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var slides, newSlides, resSlides, _iterator, _step, slide, imagePath;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _slideModel["default"].getAllSlides();
        case 3:
          slides = _context2.sent;
          if (!(slides.length === 0)) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", []);
        case 6:
          newSlides = (0, _lodash.cloneDeep)(slides);
          resSlides = [];
          _iterator = _createForOfIteratorHelper(newSlides);
          _context2.prev = 9;
          _iterator.s();
        case 11:
          if ((_step = _iterator.n()).done) {
            _context2.next = 32;
            break;
          }
          slide = _step.value;
          imagePath = slide === null || slide === void 0 ? void 0 : slide.imagePath;
          slide === null || slide === void 0 || delete slide.imagePath;
          _context2.t0 = resSlides;
          _context2.t1 = _objectSpread;
          _context2.t2 = _objectSpread({}, slide);
          _context2.t3 = {};
          if (!imagePath) {
            _context2.next = 25;
            break;
          }
          _context2.next = 22;
          return firebaseAdmin.getImageURLByName(imagePath);
        case 22:
          _context2.t4 = _context2.sent;
          _context2.next = 26;
          break;
        case 25:
          _context2.t4 = '';
        case 26:
          _context2.t5 = _context2.t4;
          _context2.t6 = {
            thumbnail: _context2.t5
          };
          _context2.t7 = (0, _context2.t1)(_context2.t2, _context2.t3, _context2.t6);
          _context2.t0.push.call(_context2.t0, _context2.t7);
        case 30:
          _context2.next = 11;
          break;
        case 32:
          _context2.next = 37;
          break;
        case 34:
          _context2.prev = 34;
          _context2.t8 = _context2["catch"](9);
          _iterator.e(_context2.t8);
        case 37:
          _context2.prev = 37;
          _iterator.f();
          return _context2.finish(37);
        case 40:
          return _context2.abrupt("return", resSlides);
        case 43:
          _context2.prev = 43;
          _context2.t9 = _context2["catch"](0);
          throw _context2.t9;
        case 46:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 43], [9, 34, 37, 40]]);
  }));
  return function getAllSlides() {
    return _ref2.apply(this, arguments);
  };
}();
var slideService = {
  createNew: createNew,
  getAllSlides: getAllSlides
};
var _default = exports["default"] = slideService;