import crypto from "crypto"

const algorithm = 'aes-256-ctr'
const key = '1l0v3k3ys'

const encryptPassword = (password) => {
  const cipher = crypto.createCipher(algorithm, password)
  let encrypted = cipher.update(key, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export default encryptPassword
