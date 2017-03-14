import * as authController from "../controllers/Auth.controller.js"
import { encryptMiddleware } from "../utils/password.js"
import passport from "passport"

export default [
  {
    method: 'GET',
    path: '/auth/fb',
    validators: [],
    handler: passport.authenticate('facebook', {
      session: false,
      scope: ['public_profile', 'email', 'user_about_me'],
    }),
  },
  {
    method: 'GET',
    path: '/auth/fb/callback',
    validators: [passport.authenticate('facebook', { session: false })],
    handler: authController.basicOauthController,
  },
  {
    method: 'POST',
    path: '/auth/signup',
    validators: [encryptMiddleware],
    handler: authController.signUp,
  },
  {
    method: 'POST',
    path: '/auth/signin',
    validators: [encryptMiddleware],
    handler: authController.signIn,
  },
  {
    method: 'POST',
    path: '/auth/pass/change',
    validators: [encryptMiddleware],
    handler: authController.assignPassword,
  },
  {
    method: 'POST',
    path: '/auth/pass/assert',
    validators: [],
    handler: authController.assertPassword,
  },
]
