import express from "express"
import { inspect } from "util"
import userRoutes from "./User.route.js"

const routes = [
  ...userRoutes,
]

const createRouter = (app) => {
  const router = express.Router()

  routes.forEach(r => {
    if (r.validators) {
      router[r.method.toLowerCase()](r.path, ...r.validators, r.handler)
    } else {
      router[r.method.toLowerCase()](r.path, r.handler)
    }
  })
  app.use(router)
}

export default createRouter
