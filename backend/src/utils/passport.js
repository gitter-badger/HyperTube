import passport from "passport"
import { Strategy as FacebookStrategy } from "passport-facebook"

const credentials = require('../../.passwords.json').credentials

const baseOauthMiddleware = (accessToken, refreshToken, profile, done) => {
    Logger.silly(`Profile from ${profile.provider}`, JSON.stringify(profile))
    const user = {}

    if (!profile.emails || !profile.emails.length) {
      Logger.error(`No email on provider: ${profile.provider}`)
      return done('Could not get email from provider')
    } else {
      user.email = profile.emails[0].value
    }

    if (profile.name) {
      if (profile.name.givenName) { user.firstname = profile.name.givenName }
      else { Logger.warn(`No firstname for email: ${user.email} when logging from ${profile.provider}`) }
      if (profile.name.familyName) { user.lastname = profile.name.familyName }
      else { Logger.warn(`No lastname for email: ${user.email} when logging from ${profile.provider}`) }
    } else {
      Logger.warn(`No name for email: ${user.email} when logging from ${profile.provider}`)
    }

    if (profile.displayName) {
      user.nickname = profile.name.displayName
    } else {
      Logger.warn(`No nickname for email: ${user.email} when logging from ${profile.provider}`)
      if (user.firstname && user.lastname) {
        user.nickname = user.firstname + user.lastname
      }
    }

    if (profile.photos && profile.photos.length) {
      user.profilePhoto = profile.photos[0].value
    } else {
      Logger.warn(`No profilePhoto for email: ${user.email} when logging from ${profile.provider}`)
    }

    done(null, user)
}

const initFacebookStrategy = () => {
  passport.use(new FacebookStrategy({
      clientID: credentials.facebook.clientID,
      clientSecret: credentials.facebook.clientSecret,
      callbackURL: `${Config.urls.api}/auth/fb/callback`,
      profileFields: ['id', 'emails', 'name', 'displayName', 'picture.type(large)'],
    },
    baseOauthMiddleware,
  ));
}

const initPassportStrategies = () => {
  initFacebookStrategy()
}

export default initPassportStrategies
