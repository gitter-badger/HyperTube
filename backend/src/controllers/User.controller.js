import filter from "filter-object"
import { handleError, NotFoundError } from  "../utils/errors.js"

const permitted = '{email,password,nickname,firstname,lastname,profilePhoto}'

export const getAllUsers = (req, res, next) => {
  User.find({})
    .then(users => {
      if (!users || !users.length) { return res.json({ results: [], message: 'No Users found' }) }
      res.json({
        results: users.map(u => u.lightSerialize),
        message: 'Found Users'
      })
    })
    .catch(err => handleError(err, res, 'Error while getting users'))
}

export const createUser = (req, res, next) => {
  const newUser = new User(filter(req.body, permitted))
  newUser.valid = false
  newUser.save()
    .then(savedUser => {
      res.status(201).json({ results: savedUser.serialize, message: 'User created' })
    })
    .catch(err => handleError(err, res, 'Error while creating user'))
}

export const validUserEmail = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.id }, { valid: true }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) { return Promise.reject(new NotFoundError('User')) }
      res.json({
        results: updatedUser.serialize,
        message: 'Successfully validated user email',
      })
    })
    .catch(err => handleError(err, res, 'Error while validating user'))
}

export const resetUserPassword = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.id }, { password: req.body.password }, { new: true })
    .then(updatedUser => {
      results: updatedUser.serialize,
      message: 'Successfully changed user password',
    })
    .catch(err => handleError(err, res, 'Error while changing user password'))
}

export const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then(foundUser => {
      if (!foundUser) { return Promise.reject(new NotFoundError('User')) }
      res.json({
        results: foundUser.serialize,
        message: 'User found',
      })
    })
    .catch(err => handleError(err, res, 'Error while getting user'))
}

export const updateUserById = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, filter(req.body, permitted))
    .then(updatedUser => {
      if (!updatedUser) { return Promise.reject(new NotFoundError('User')) }
      res.json({
        results: updatedUser.serialize,
        message: 'User updated',
      })
    })
    .catch(err => handleError(err, res, 'Error while updating user'))
}

export const deleteUserById = (req, res, next) => {
  User.remove({ _id: req.params.id })
    .then(del => {
      if (!del.result.n) { return Promise.reject(new NotFoundError('User')) }
      res.json({
        results: null,
        message: 'User deleted',
      })
    })
    .catch(err => handleError(err, res, 'Error while deleting user'))
}
