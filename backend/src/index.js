import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import passport from "passport"
import morgan from "morgan"
import winston from "winston"
import ioredis from "ioredis"

import configs from "../config/index.js"


const app = express()

const env = process.env.node_env || 'development'
const config = configs[env]

global.Config = config

global.User = require('./models/User.model.js').default

global.Logger = new (winston.Logger)({
  transports: config.logger.map((t) => new (winston.transports[t.type])(t.configuration)),
})

global.RedisClient = new ioredis(config.redis)

const createRouter = require('./routes/index.js').default
const createPassport = require('./utils/passport.js').default

createPassport()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())

app.use(morgan("combined", { stream: { write: (msg) => Logger.verbose(msg) } }))

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
  Logger.verbose(`App is running and listening to port ${config.server.port}`)
})
