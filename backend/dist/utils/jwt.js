'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractToken = exports.decryptToken = exports.createToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = require('../../config/development.js').jwt.secret;

var createToken = exports.createToken = function createToken(obj) {
  return _jsonwebtoken2.default.sign(obj, secret);
};

var decryptToken = exports.decryptToken = function decryptToken(token) {
  return _jsonwebtoken2.default.verify(obj, secret);
};

var extractToken = exports.extractToken = function extractToken(headers) {
  if (!headers || !headers.authorization) {
    throw 'not found';
  }

  var splitted = headers.authorization.split(' ');
  if (splitted.length !== 2 || splitted[0] !== 'Bearer') {
    throw 'bad formatted';
  }

  try {
    return _jsonwebtoken2.default.verify(splitted[1], secret);
  } catch (e) {
    throw 'invalid';
  }
};