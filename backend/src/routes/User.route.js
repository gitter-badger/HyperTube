import * as userController from "../controllers/User.controller.js"
import * as userValidator from "../validators/User.validator.js"

export default [
  {
    method: 'GET',
    path: '/users',
    validators: [],
    handler: userController.getAllUsers,
  },
  {
    method: 'GET',
    path: '/users/validate/:id',
    validators: [],
    handler: userController.validUserEmail,
  },
  {
    method: 'GET',
    path: '/users/reset/:id',
    validators: [],
    handler: userController.resetUserPassword,
  },
  {
    method: 'POST',
    path: '/users',
    validators: [userValidator.createUser],
    handler: userController.createUser,
  },
  {
    method: 'GET',
    path: '/users/:id',
    validators: [userValidator.getUserById],
    handler: userController.getUserById,
  },
  {
    method: 'PUT',
    path: '/users/:id',
    validators: [userValidator.updateUserById],
    handler: userController.updateUserById,
  },
  {
    method: 'DELETE',
    path: '/users/:id',
    validators: [userValidator.deleteUserById],
    handler: userController.deleteUserById,
  }
]
