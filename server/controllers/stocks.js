const moment = require("moment")

const API = require("../routes/api/stocks")
let tickers

module.exports = {
  getSymbols: async (req, res, next) => {
    if (tickers && moment().unix() - tickers.timestamp < 86400) {
      res.status(200)
      return res.json({ tickers: tickers.data })
    }
    const data = await API.symbols()
    const options = data.data.map(s => { 
      return { value: s.symbol, label: s.symbol }
    })

		tickers = { data: options, timestamp: moment().unix() }
		res.status(200)
    res.json({ tickers: tickers.data })
  },
  getGainers: async (req, res, next) => {
    const data = await API.gainers()
    console.log(data.data)
    res.status(200).json(data.data)
  },
  getLosers: async (req, res, next) => {
    const data = await API.losers()
    console.log(data.data)
    res.status(200).json(data.data)
  },
  getPrice: async (req, res, next) => {
    const data = await API.price(req.params.ticker)
    console.log(data.data)
    res.status(200).json(data.data)
  },
  getPriceTarget: async (req, res, next) => {
    const data = await API.priceTarget(req.params.ticker)
    console.log(data.data)
    res.status(200).json(data.data)
	},
	getIntradayPrices: async (req, res, next) => {
    const data = await API.intradayPrices(req.params.ticker)
    console.log(data.data)
    res.status(200).json(data.data)
  },
  getHistoricalPrices: async (req, res, next) => {
    const hasRange = [
			'max', '5y', '2y', '1y', 'ytd', '6m', '3m', '1m'
    ].includes(req.params.range)
    const range = hasRange ? req.params.range : "1m"
    const data = await API.historicalPrices(req.params.ticker, range)
    console.log(data.data)
    res.status(200).json(data.data)
  },
  getInfo: async (req, res, next) => {
    const data = await API.info(req.params.ticker)
    console.log(data.data)
    res.status(200).json(data.data)
  },
  getCashflow: async (req, res, next) => {
    const data = await API.cashFlow(req.params.ticker)
    console.log(data.data)
    res.status(200).json(data.data)
  },
  getBalanceSheet: async (req, res, next) => {
    const hasPeriod = ["quarter", "annual"].includes(req.params.period)
    const period = hasPeriod ? req.params.period : "quarter"
    const data = await API.balanceSheet(req.params.ticker, period)
    console.log(data.data)
    res.status(200).json(data.data)
  },
  getIncomeStatement: async (req, res, next) => {
    const hasPeriod = ["quarter", "annual"].includes(req.params.period)
    const period = hasPeriod ? req.params.period : "quarter"
    const data = await API.incomeStatement(req.params.ticker, period)
    console.log(data.data)
    res.status(200).json(data.data)
  }
};
