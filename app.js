const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const verifyToken = require('./lib/verifyToken')
require('dotenv').config()

const app = express()

/**
 * Settings
 */

app.use(cors())
app.use(express.json())
app.set('json spaces', 2)
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Middlewares
 */

app.use(cookieParser())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))

const pass = (req, res, next) => next()

/**
 * Routes
 */

const routes = require('./routes.json')

routes.forEach(({ route, path, requiresAuth }) => {
  app.use('/' + route, (requiresAuth ? verifyToken : pass), require(path))
})

module.exports = app
