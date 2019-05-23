const mongoose = require('mongoose')
const { Schema } = mongoose

const tickerSchema = new Schema({
    ticker: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = Ticker = mongoose.model('Ticker', tickerSchema)