"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.createUser = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _errors = require("../utils/errors.js");

var _passwordEncryption = require("../utils/passwordEncryption.js");

var _passwordEncryption2 = _interopRequireDefault(_passwordEncryption);

var _validImage = require("../utils/validImage.js");

var _validImage2 = _interopRequireDefault(_validImage);

var _jwt = require("../utils/jwt.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUser = exports.createUser = function createUser(req, res, next) {
  if (!req.body.password) {
    return (0, _errors.handleError)(new _errors.ValidationError('password', 'not found'), res);
  }
  req.body.password = (0, _passwordEncryption2.default)(req.body.password);

  // TODO handle image and set req.body.profilePhoto to the saved path
  return next();
};

var getUserById = exports.getUserById = function getUserById(req, res, next) {
  if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
    return (0, _errors.handleError)(new _errors.ValidationError('id', 'invalid'), res);
  }

  if (!req.headers || !req.headers.authorization) {
    return (0, _errors.handleError)(new _errors.ValidationError('token', 'not found'), res);
  }
  try {
    (0, _jwt.extractToken)();
  } catch (e) {
    return (0, _errors.handleError)(new _errors.BadAuthorizationError(e), res);
  }
  return next();
};

var updateUserById = exports.updateUserById = function updateUserById(req, res, next) {
  if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
    return (0, _errors.handleError)(new _errors.ValidationError('id', 'invalid'), res);
  }

  if (!req.headers || !req.headers.authorization) {
    return (0, _errors.handleError)(new _errors.ValidationError('token', 'not found'), res);
  }
  try {
    var id = (0, _jwt.extractToken)();
    if (id !== req.params.id) {
      return (0, _errors.handleError)(new _errors.NotAuthorizedError(), res);
    }
  } catch (e) {
    return (0, _errors.handleError)(new _errors.BadAuthorizationError(e), res);
  }
  return next();
};

var deleteUserById = exports.deleteUserById = function deleteUserById(req, res, next) {
  if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
    return (0, _errors.handleError)(new _errors.ValidationError('id', 'invalid'), res);
  }

  if (!req.headers || !req.headers.authorization) {
    return (0, _errors.handleError)(new _errors.ValidationError('token', 'not found'), res);
  }
  try {
    var id = (0, _jwt.extractToken)();
    if (id !== req.params.id) {
      return (0, _errors.handleError)(new _errors.NotAuthorizedError(), res);
    }
  } catch (e) {
    return (0, _errors.handleError)(new _errors.BadAuthorizationError(e), res);
  }
  return next();
};