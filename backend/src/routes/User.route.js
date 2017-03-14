import * as userController from "../controllers/User.controller.js"
import * as userValidator from "../validators/User.validator.js"

export default [
/**
* @api {GET} /users Get all users
* @apiName getAllUsers
* @apiGroup User
*
* @apiDescription Get all users
*
* @apiSuccess {Object} results User information
* @apiSuccess {String} message success message
*/
  {
    method: 'GET',
    path: '/users',
    validators: [],
    handler: userController.getAllUsers,
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
  },
]
