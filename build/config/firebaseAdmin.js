"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = exports.getImageURLByName = exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _environment = _interopRequireDefault(require("./environment"));
var serviceAccount = {
  type: _environment["default"].TYPE,
  project_id: _environment["default"].PROJECT_ID,
  private_key_id: _environment["default"].PRIVATE_KEY_ID,
  private_key: _environment["default"].PRIVATE_KEY,
  client_email: _environment["default"].CLIENT_EMAIL,
  client_id: _environment["default"].CLIENT_ID,
  auth_uri: _environment["default"].AUTH_URI,
  token_uri: _environment["default"].TOKEN_URI,
  auth_provider_x509_cert_url: _environment["default"].AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: _environment["default"].CLIENT_X509_CERT_URL,
  universe_domain: _environment["default"].UNIVERSE_DOMAIN
};
_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert(serviceAccount),
  storageBucket: 'gs://vt-shop-65df4.appspot.com'
});
var bucket = _firebaseAdmin["default"].storage().bucket();
var uploadFile = exports.uploadFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file, fileName) {
    var fileBuffer, fileUpload, stream;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          fileBuffer = file.buffer; // const fileName = `${folders.join('/')}/${name}-${uniqueId}.${file.mimetype.split('/')[1]}`
          fileUpload = bucket.file(fileName);
          stream = fileUpload.createWriteStream({
            metadata: {
              contentType: file.mimetype
            }
          });
          stream.on('error', function (error) {
            throw new Error('Error uploading file: ' + error.message);
          });
          stream.end(fileBuffer);
          return _context.abrupt("return", fileName);
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          throw new Error('Error uploading file: ' + _context.t0.message);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function uploadFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getImageURLByName = exports.getImageURLByName = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(fileName) {
    var expirationDate, file, url;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 15);
          file = bucket.file(fileName);
          _context2.next = 6;
          return file.getSignedUrl({
            action: 'read',
            expires: expirationDate
          });
        case 6:
          url = _context2.sent;
          return _context2.abrupt("return", url[0]);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getImageURLByName(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = exports["default"] = _firebaseAdmin["default"];