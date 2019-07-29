const sse = require('./sse')

const streams = {}
const stocks = {}

module.exports = {
	onConnect: io => {
		
		io.on('connection', async socket => {

			const foundUser = await User.findById(socket.decoded.sub)

			if (foundUser) {
				console.log(`${foundUser.username} (${socket.decoded.sub}) connected...`)
				console.log(foundUser.watchlist)
				
				io.to(socket.id).emit('watchlist', { watchlist: foundUser.watchlist })

				for (let ticker of foundUser.watchlist) {

					socket.join(ticker)

					if (io.sockets.adapter.rooms[ticker].length === 1 && !streams[ticker]) {
						streams[ticker] = sse.connect(ticker)
						sse.onData(streams, stocks, ticker, io)
					} else {
						io.to(ticker).emit(`${ticker}-data`, stocks[ticker])
					}

					socket.on(`remove-${ticker}`, () => {
						socket.leave(ticker)
						if (!io.sockets.adapter.rooms[ticker] && streams[ticker]) {
							streams[ticker].abort()
							delete streams[ticker]
							delete stocks[ticker]
						}
					})

				}

				socket.on('disconnect', () => {

					console.log('disconnecting...')

					for (let ticker of foundUser.watchlist) {
						if (!io.sockets.adapter.rooms[ticker] && streams[ticker]) {
							streams[ticker].abort()
							delete streams[ticker]
							delete stocks[ticker]
						}
					}

				})
			}
		})
	}
}