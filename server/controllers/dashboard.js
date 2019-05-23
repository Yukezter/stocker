const User = require('../models/User')
const API = require('../routes/api/stocks')

module.exports = {
  dashboard: async (req, res, next) => {

    if (!req.user.watchlist.length) {
      res.status(200)
      return res.json({ watchlist: 'Watchlist is empty' })
    }
    res.status(200).json({ watchlist: req.user.watchlist })
  },
  addStock: async (req, res, next) => {
    if (req.user.watchlist.includes(req.params.ticker.toUpperCase())) {
      res.status(200)
      return res.json({ 'Ticker already in list': req.user.watchlist })
    }

    const foundUser = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { watchlist: req.params.ticker } },
      { new: true }
    );

    res.status(200).json({
      watchlist: foundUser.watchlist
    })
  },
  removeStock: async (req, res, next) => {

    if (!req.user.watchlist.includes(req.params.ticker.toUpperCase())) {
      res.status(200);
      return res.json({ 'Ticker not in list': req.user.watchlist })
    }

    const foundUser = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { watchlist: req.params.ticker } },
      { new: true }
    )
    
    console.log(foundUser.watchlist)

    res.status(200).json({
      watchlist: foundUser.watchlist
    })
  }
}
