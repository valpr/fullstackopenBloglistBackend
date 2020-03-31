const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
mongoose.set('useCreateIndex', true);
//APP role: connect to DB, decide middleware order
logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use(middleware.unknownEP)
app.use(middleware.errorHandler)



module.exports = app
