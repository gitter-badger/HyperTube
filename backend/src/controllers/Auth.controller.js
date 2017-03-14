import filter from "filter-object"
import { createToken, decryptToken } from "../utils/jwt.js"
import { handleError, NotFoundError, AlreadyExistingAccount, UndefinedPassword, ValidationError } from  "../utils/errors.js"

const permitted = '{email,password,nickname,firstname,lastname,profilePhoto}'

const handlePasswordAssignation = (email, password) => {
  const passwordToken = createToken(password)

  RedisClient.set(email, passwordToken)
  Logger.debug(`Sending token ${passwordToken} to ${email}`)
  // Send mail
}

export const basicOauthController = (req, res) => {
  Logger.silly('Received from oauth:', req.user)
  User.findOne({ email: req.user.email })
    .then((foundUser) => {
      if (!foundUser) { return new User(filter(req.user, permitted)).save() }
      return Promise.resolve(foundUser)
    })
    .then((user) => {
      res.json({
        results: {
          user: user.serialize,
          token: createtoken(user._id),
        },
        message: 'Successfully logged in',
      })
      // Or! Maybe do a res.redirect('uri?token=...)
    })
    .catch((err) => handleError(err, res, 'Error while authentifying user'))
}

export const signUp = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (foundUser) {
        if (foundUser.password) {
          return Promise.reject(new AlreadyExistingAccount, res)
        } else {
          return Promise.reject(new UndefinedPassword, res)
        }
      }

      return new User(filter(req.body, permitted)).save()
    })
    .then((user) => {
      res.json({
        results: user.serialize,
        message: 'User successfully created',
      })
      handlePasswordAssignation(req.body.email, req.body.password)
    })
    .catch((err) => handleError(err, res, 'Error while creating user'))
}

export const signIn = (req, res) => {
  User.findOne(filter(req.body, '{email,password}'))
    .then((user) => {
      if (!user) { return res.json({ results: null, message: 'Email and password not matching' }) }
      if (!user.isPasswordValid) { return handleError(new ValidationError('password', 'not verified'), res) }
      res.json({
        results: {
          user: user.serialize,
          token: createToken(user._id),
        },
        message: 'User successfully logged in',
      })
    })
    .catch((err) => handleError(err, res, 'Error while signing in'))
}

export const assignPassword = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (!foundUser) { return Promise.reject(NotFoundError('User')) }

      foundUser.isPasswordValid = false
      return foundUser.save()
    })
    .then((updatedUser) => {
      res.json({
        results: updatedUser.serialize,
        message: 'Change password procedure launched',
      })
      handlePasswordAssignation(req.body.email, req.body.password)
    })
    .catch((err) => handleError(err, res, 'Error while changing user password'))
}

export const assertPassword = (req, res) => {
  RedisClient.get(req.body.email)
    .then((token) => {
      if (!token) { return Promise.reject(new NotFoundError('Reset password token')) }
      if (token !== req.body.token) { return Promise.reject(new ValidationError('token', 'invalid')) }

      const newPassword = decryptToken(token)
      return User.findOneAndUpdate(
        { email: req.body.email },
        {
          password: newPassword,
          isPasswordValid: true,
        },
        {
          new: true,
        }
      )
    })
    .then((updatedUser) => {
      if (!updatedUser) { return Promise.reject(new NotFoundError('User')) }
      res.json({
        results: updatedUser.serialize,
        message: 'Password successfully set',
      })
    })
    .catch((err) => handleError(err, res, 'Error while asserting password'))
}
