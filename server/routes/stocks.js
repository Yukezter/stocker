const router = require('express-promise-router')()

const stocksController = require('../controllers/stocks')

router.route('/symbols')
    .get(stocksController.getSymbols)

router.route('/gainers')
    .get(stocksController.getGainers)

router.route('/losers')
    .get(stocksController.getLosers)

router.route('/:ticker/price')
    .get(stocksController.getPrice)

router.route('/:ticker/pricetarget')
    .get(stocksController.getPriceTarget)

router.route('/:ticker/intraday')
    .get(stocksController.getIntradayPrices)

router.route('/:ticker/chart/:range')
    .get(stocksController.getHistoricalPrices)

router.route('/:ticker/info')
    .get(stocksController.getInfo)

router.route('/:ticker/cashflow')
    .get(stocksController.getCashflow)

router.route('/:ticker/balancesheet/:period')
    .get(stocksController.getBalanceSheet)

router.route('/:ticker/income/:period')
    .get(stocksController.getIncomeStatement)

module.exports = router