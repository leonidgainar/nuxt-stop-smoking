const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieParser = require('cookie-parser')

require('dotenv').config({
  path: path.join(__dirname, './.env'),
})

// DB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', function callback() {
  console.log('MongoDB Connected...')
})

// Create express instnace
const app = express()
app.use(cookieParser())

// Init body-parser options (inbuilt with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

// Require & Import API routes
const authentication = require('./routes/authentication')
const cigarette = require('./routes/cigarette')
const cigaretteBrand = require('./routes/cigaretteBrand')
const money = require('./routes/money')

// Use API Routes
app.use('/auth', authentication)
app.use('/cigarette', cigarette)
app.use('/cigaretteBrand', cigaretteBrand)
app.use('/money', money)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
