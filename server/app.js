const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect("mongodb://localhost/stocker", { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

module.exports = app