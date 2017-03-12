"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserController = require("../controllers/User.controller.js");

var userController = _interopRequireWildcard(_UserController);

var _UserValidator = require("../validators/User.validator.js");

var userValidator = _interopRequireWildcard(_UserValidator);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = [{
  method: 'GET',
  path: '/users',
  validators: [],
  handler: userController.getAllUsers
}, {
  method: 'POST',
  path: '/users',
  validators: [userValidator.createUser],
  handler: userController.createUser
}, {
  method: 'GET',
  path: '/users/:id',
  validators: [userValidator.getUserById],
  handler: userController.getUserById
}, {
  method: 'PUT',
  path: '/users/:id',
  validators: [userValidator.updateUserById],
  handler: userController.updateUserById
}, {
  method: 'DELETE',
  path: '/users/:id',
  validators: [userValidator.deleteUserById],
  handler: userController.deleteUserById
}];