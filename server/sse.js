require('dotenv').config({ path: `${__dirname}/.env` })
const request = require('request')

const openStream = (ticker) => {
	return request({
		url: `https://cloud-sse.iexapis.com/stable/stocksUS5Second?token=${process.env.IEX_SK}&symbols=${ticker}`,
		headers: { 'Content-Type': 'text/event-stream' }
	})
}

module.exports = {
	connect: ticker => {
		return openStream(ticker)
	},
	onData: (streams, stocks, ticker, io) => {

		streams[ticker].on('data', response => {
			try {
				const str = response.toString()
				const data = JSON.parse(str.replace('data: ', ''))

				stocks[ticker] = {
					company: data[0].companyName,
					price: data[0].latestPrice,
					change: data[0].change,
					changePercent: data[0].changePercent
				}

				io.to(ticker).emit(`${ticker}-data`, stocks[ticker])

				if (data[0].latestSource === 'Close') {
					streams[ticker].abort()
					delete streams[ticker]
				}

				console.log(data[0].latestPrice)
			} catch (error) {
				console.log(error.name, error.message)
				console.log(error.stack)
			}
		})

		streams[ticker].on('socket', () => {
			console.log('------------STREAM CREATED------------')
		})

		streams[ticker].on('end', () => {
			console.log('------------STREAM DELETED------------')
		})

		streams[ticker].on('complete', () => {
			console.log('------------STREAM COMPLETED------------')
			streams[ticker] = openStream(ticker)
		})

		streams[ticker].on('error', err => {
			console.log('------------STREAM ERROR------------')
			console.log('Error', err)
			streams[ticker] = openStream(ticker)
		})
	}
}