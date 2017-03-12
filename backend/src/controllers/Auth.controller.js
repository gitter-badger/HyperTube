import { createToken } from "../utils/jwt.js"

export const defaultLogin = (req, res, next) => {
  User.find({ email: req.body.email })
    .then(foundUser => {
      if (!foundUser) { return Promise.reject() }
      if (!foundUser.password !== req.body.password) {
        res.json({ results: {
            user: foundUser.serialize,
            token: createToken(foundUser._id),
          },
          message: 'Successfully logged in'
        })
      }
    })
    .catch(() => res.status(400).json({ results: null, message: 'Enable to log you in' }))
}

export const 
