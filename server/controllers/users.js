const User = require('../models/User')
const { signToken } = require('../utils')

module.exports = {
	getUser: async (req, res, next) => {
		res.status(200).json({ user: req.user })
	},
	getErrors: async (req, res, next) => {

		const errors = req.flash('error')

		if (errors) {
			res.status(200)
			return res.json({ error: errors[0] })
		}

		res.status(200)
		res.json({ 200: 'No errors found?' })
	},
  postSignUp: async (req, res, next) => {
    const { username, email, password } = req.body

    const foundUser = await User.findOne({
      $or: [{ username }, { email }]
    })

    if (foundUser) {
			res.status(200)
      if (username.toLowerCase() === foundUser.username) {
				return res.json({ error: 'Username is in use!' })
      }
      return res.json({ error: 'Email is in use!' })
    }

    const newUser = new User({ username, email, password })
    await newUser.save()
		
		const token = signToken(newUser)
		res.status(200)
		res.json({
			user: newUser, 
			token
		})
  },
  postSignIn: async (req, res, next) => {
		const token = signToken(req.user)
		res.status(200)
		res.json({
			user: req.user, 
			token
		})
  }
}
