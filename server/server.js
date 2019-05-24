require('dotenv').config({ path: 'server/.env' })
const socket = require('socket.io')
const jwt = require('jsonwebtoken')

const app = require('./app')

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, console.log(`Server listening on port ${PORT}`))
const io = socket(server, { origins: '*:*' })

const User = require('./models/User')
const s = require('./socket')

io.use((socket, next) => {
	if (socket.handshake.query && socket.handshake.query.token) {

			jwt.verify(
				socket.handshake.query.token, 
				process.env.JWT_SECRET, 
				(err, decoded) => {
					if (err) return next(new Error('Authentication error'))
					socket.decoded = decoded
					next()
				}
			)

	} else {
			next(new Error('Authentication error'))
	}    
})

s.onConnect(io)

