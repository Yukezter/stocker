// require('dotenv').config({ path: `./server/.env` })
const axios = require('axios')

const iexToken = process.env.IEX_SK
const baseUrl = 'https://cloud.iexapis.com/stable'

const query = (endpoint, parameters = '') => {
    console.log(`${baseUrl}${endpoint}?${parameters}token=${iexToken}`)
    return axios.get(`${baseUrl}${endpoint}?${parameters}token=${iexToken}`)
}

module.exports = {
    symbols: () => {
        return query(`/ref-data/symbols`, `filter=symbol&`)
    },
    batch: (watchlist) => {
        return query(`/stock/market/batch`, `symbols=${watchlist}&types=price&`)
    },
    gainers: () => {
        return query(`/stock/market/list/gainers`, `displayPercent=true&`)
    },
    losers: () => {
        return query(`/stock/market/list/losers`, `displayPercent=true&`)
    },
    price: ticker => {
        return query(`/stock/${ticker}/price`)
    },
    priceTarget: ticker => {
        return query(`/stock/${ticker}/price-target`)
    },
    intradayPrices: ticker => {
        return query(`/stock/${ticker}/intraday-prices`)
    },
    historicalPrices: (ticker, range) => {
        return query(`/stock/${ticker}/chart/${range}`)
    },
    info: ticker => {
        return query(`/stock/${ticker}/company`)
    },
    cashFlow: ticker => {
        return query(`/stock/${ticker}/cash-flow`)
    },
    balanceSheet: (ticker, period) => {
        return query(`/stock/${ticker}/balance-sheet`, `period=${period}&`)
    },
    incomeStatement: (ticker, period) => {
        return query(`/stock/${ticker}/income`, `period=${period}&`)
    }
}