import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import passport from "passport"
import { Strategy } from "passport-jwt"

import configs from "../config/index.js"
import createRouter from "./routes/index.js"

const Logger = console

const app = express()

const env = process.env.node_end || 'development'
const config = configs[env]

global.User = require('./models/User.model.js').default

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

passport.use(new Strategy({
  jwtFromRequest: (req) => {
    try {
      console.log('Header', req.headers.authorization)
      if (!req.headers || !req.headers.authorization) { return null }

      const splitted = req.headers.authorization.split(' ')
      if (splitted.length !== 2 || splitted[0] !== 'Bearer') { return null }
      console.log('Token', splitted[1])
      return splitted[1]
    } catch (e) {
      return null
    }
  },
  secretOrKey: config.jwt.secret,
}, (payload, done) => {
  console.log('Payload', payload)
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err, false)
    } else if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
}))

mongoose.Promise = global.Promise

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`)
const db = mongoose.connection
db.on('error', err => {
  Logger.log('FAILED TO CONNECT', err)
  process.exit(1)
})

db.once('open', () => {
  createRouter(app)
  app.listen(config.server.port)
  app.emit('ready')
  Logger.log(`App is running and listening to port ${config.server.port}`)
})
