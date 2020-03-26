const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogModel = require('./models/blog')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response ) => {
  blogModel
    .find({})
    .then(blogs => {
      response.json(blogs)
    }).catch(error => console.log(error))
})

app.post('/api/blogs', (request, response) => {
  const blog = new blogModel(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})