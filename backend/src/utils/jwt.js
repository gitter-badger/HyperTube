import jwt from "jsonwebtoken"

const secret = require('../../config/development.js').jwt.secret

export const createToken = (obj) => jwt.sign(obj, secret)

export const decryptToken = (token) => jwt.verify(obj, secret)

export const extractToken = (headers) => {
  if (!headers || !headers.authorization) {
    throw 'not found'
  }

  const splitted = headers.authorization.split(' ')
  if (splitted.length !== 2 || splitted[0] !== 'Bearer') {
    throw 'bad formatted'
  }

  try {
    return jwt.verify(splitted[1], secret)
  } catch (e) {
    throw 'invalid'
  }
}
