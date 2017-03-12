"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.createUser = exports.getAllUsers = undefined;

var _filterObject = require("filter-object");

var _filterObject2 = _interopRequireDefault(_filterObject);

var _errors = require("../utils/errors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var permitted = '{email,password,nickname,firstname,lastname,profilePhoto}';

var getAllUsers = exports.getAllUsers = function getAllUsers(req, res, next) {
  User.find({}).then(function (users) {
    if (!users || !users.length) {
      return res.json({ results: [], message: 'No Users found' });
    }
    res.json({
      results: users.map(function (u) {
        return u.lightSerialize;
      }),
      message: 'Found Users'
    });
  }).catch(function (err) {
    return (0, _errors.handleError)(err, res, 'Error while getting users');
  });
};

var createUser = exports.createUser = function createUser(req, res, next) {
  new User((0, _filterObject2.default)(req.body, permitted)).save().then(function (savedUser) {
    return res.status(201).json({ results: savedUser.serialize, message: 'User created' });
  }).catch(function (err) {
    return (0, _errors.handleError)(err, res, 'Error while creating user');
  });
};

var getUserById = exports.getUserById = function getUserById(req, res, next) {
  User.findById(req.params.id).then(function (foundUser) {
    if (!foundUser) {
      return Promise.reject(new _errors.NotFoundError('User'));
    }
    res.json({
      results: foundUser.serialize,
      message: 'User found'
    });
  }).catch(function (err) {
    return (0, _errors.handleError)(err, res, 'Error while getting user');
  });
};

var updateUserById = exports.updateUserById = function updateUserById(req, res, next) {
  User.findByIdAndUpdate(req.params.id, (0, _filterObject2.default)(req.body, permitted)).then(function (updatedUser) {
    if (!updatedUser) {
      return Promise.reject(new _errors.NotFoundError('User'));
    }
    res.json({
      results: updatedUser.serialize,
      message: 'User updated'
    });
  }).catch(function (err) {
    return (0, _errors.handleError)(err, res, 'Error while updating user');
  });
};

var deleteUserById = exports.deleteUserById = function deleteUserById(req, res, next) {
  User.remove({ _id: req.params.id }).then(function (del) {
    if (!del.result.n) {
      return Promise.reject(new _errors.NotFoundError('User'));
    }
    res.json({
      results: null,
      message: 'User deleted'
    });
  }).catch(function (err) {
    return (0, _errors.handleError)(err, res, 'Error while deleting user');
  });
};