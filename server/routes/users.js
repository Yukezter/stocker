require('dotenv').config({ path: 'server/.env' })
const router = require("express-promise-router")()
const passport = require('passport')
const passportConfig = require('../config/passport')

const UsersController = require("../controllers/users")

const jwtStrategy = passport
	.authenticate('jwt', {
		session: false, 
		failureRedirect: '/users/errors',
		failureFlash: true
	})

const localStrategy = passport
	.authenticate('local', {
		session: false,
		failureRedirect: '/users/errors',
		failureFlash: true 
	})

router
	.route('/getuser')
	.get(jwtStrategy, UsersController.getUser)

router
	.route('/errors')
	.get(UsersController.getErrors)

router
	.route('/signup')
	.post(UsersController.postSignUp)

router
	.route('/signin')
	.post(localStrategy, UsersController.postSignIn)

module.exports = router
