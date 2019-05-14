const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(require('./routes'))

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
  }

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stocker", { useNewUrlParser: true })

module.exports = app