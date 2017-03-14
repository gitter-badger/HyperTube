import jwt from "jsonwebtoken"
import { handleError, BadAuthorizationError } from "./errors.js"

const { secret } = Config.jwt

export const createToken = (obj) => jwt.sign(obj, secret)

export const decryptToken = (token) => jwt.verify(token, secret)

export const jwtMiddleWare = (req, res, next) => {
  if (!headers || !headers.authorization) {
    return handleError(new BadAuthorizationError('not found'), res)
  }

  const splitted = headers.authorization.split(' ')
  if (splitted.length !== 2 || splitted[0] !== 'Bearer') {
    return handleError(new BadAuthorizationError('bad formatted'), res)
  }

  try {
    req.user = jwt.verify(splitted[1], secret)
    return next()
  } catch (e) {
    return handleError(new BadAuthorizationError('invalid'), res)
  }
}
