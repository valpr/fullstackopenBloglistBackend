const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

//APP role: connect to DB, decide middleware order
console.log('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
