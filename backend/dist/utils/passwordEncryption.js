'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var algorithm = 'aes-256-ctr';
var key = '1l0v3k3ys';

var encryptPassword = function encryptPassword(password) {
  var cipher = _crypto2.default.createCipher(algorithm, password);
  var encrypted = cipher.update(key, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

exports.default = encryptPassword;