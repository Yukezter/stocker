require('dotenv').config({ path: `${__dirname}/.env` })
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const express = require('express')
const app = express()


const jwtStrategy = passport
	.authenticate('jwt', {
		session: false, 
		failureRedirect: '/users/errors',
		failureFlash: true
	})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())

// Routes
app.use('/users', require('./routes/users'))
app.use('/stocks', require('./routes/stocks'))
app.use('/dashboard', jwtStrategy, require('./routes/dashboard'))
    
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

// Error handling
app.use('/users', (err, req, res, next) => {
  res.json({ [err.name]: err.message })
})
app.use('/stocks', (err, req, res, next) => {
  res.json({ [err.name]: err.message })
})
app.use('/dashboard', (err, req, res, next) => {
  res.json({ [err.name]: err.message })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

mongoose.connect(
  process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL, 
  { useNewUrlParser: true, autoIndex: false, useFindAndModify: false },
)

module.exports = app