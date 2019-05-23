const router = require('express-promise-router')()

const DashboardController = require('../controllers/dashboard')

router
	.route('/')
	.get(DashboardController.dashboard)

router
	.route('/add/:ticker')
	.get(DashboardController.addStock)

router
	.route('/remove/:ticker')
	.get(DashboardController.removeStock)

module.exports = router