import mongoose from "mongoose"

import { handleError, ValidationError, NotAuthorizedError, BadAuthorizationError } from "../utils/errors.js"
import encryptPassword from "../utils/passwordEncryption.js"
import validImage from "../utils/validImage.js"
import { extractToken } from "../utils/jwt.js"

export const createUser = (req, res, next) => {
  if (!req.body.password) { return handleError(new ValidationError('password', 'not found'), res) }
  req.body.password = encryptPassword(req.body.password)

  // TODO handle image and set req.body.profilePhoto to the saved path
  return next()
}

export const getUserById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) { return handleError(new ValidationError('id', 'invalid'), res) }

  if (!req.headers || !req.headers.authorization) { return handleError(new ValidationError('token', 'not found'), res) }
  try {
    extractToken()
  } catch (e) {
    return handleError(new BadAuthorizationError(e), res)
  }
  return next()
}

export const updateUserById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) { return handleError(new ValidationError('id', 'invalid'), res) }

  if (!req.headers || !req.headers.authorization) { return handleError(new ValidationError('token', 'not found'), res) }
  try {
    const id = extractToken()
    if (id !== req.params.id) {
      return handleError(new NotAuthorizedError, res)
    }
  } catch (e) {
    return handleError(new BadAuthorizationError(e), res)
  }
  return next()
}

export const deleteUserById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) { return handleError(new ValidationError('id', 'invalid'), res) }

  if (!req.headers || !req.headers.authorization) { return handleError(new ValidationError('token', 'not found'), res) }
  try {
    const id = extractToken()
    if (id !== req.params.id) {
      return handleError(new NotAuthorizedError, res)
    }
  } catch (e) {
    return handleError(new BadAuthorizationError(e), res)
  }
  return next()
}
