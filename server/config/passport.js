require('dotenv').config({ path: 'server/.env' })
const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Strategy: LocalStrategy } = require('passport-local')

const User = require('../models/User')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        const foundUser = await User.findById(payload.sub)
        if (!foundUser) {
          return done(null, false, { message: 'User not found' })
        }

        done(null, foundUser)
      } catch (error) {
        done(error, false, { message: error.message })
      }
    }
  )
)

passport.use(
  new LocalStrategy(
    {
      usernameField: "usernameOrEmail"
    },
    async (usernameOrEmail, password, done) => {
      try {
        const foundUser = await User.findOne({
          $or: [
						{ username: usernameOrEmail }, 
						{ email: usernameOrEmail }
					]
        })

        if (!foundUser) {
          return done(null, false, { 
            message: 'Invalid username or email'
          })
        }

        const isMatch = await foundUser.isValidPassword(password)

        if (!isMatch) {
          return done(null, false, { message: 'Invalid password' })
        }

        done(null, foundUser)
      } catch (error) {
        done(error, false)
      }
    }
  )
)
