import crypto from "crypto"
import { ValidationError, handleError } from "./errors.js"

const { algorithm, key } = require('../../.passwords.json').password

export const encrypt = (password) => {
  const cipher = crypto.createCipher(algorithm, password)
  let encrypted = cipher.update(key, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export const encryptMiddleware = (req, res, next) => {
  if (!req.body.password) { return handleError(new ValidationError('password', 'not present'), res) }
  req.body.password = encrypt(req.body.password)
  next()
}
