const blogsRouter = require('express').Router()
const blogModel = require('../models/blog')

//blogsRouter handles all GET/POST requests

blogsRouter.get('/', (request, response ) => {
    blogModel
      .find({})
      .then(blogs => {
        response.json(blogs)
      }).catch(error => console.log(error))
  })
  
  blogsRouter.post('/', (request, response) => {
    const blog = new blogModel(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
module.exports = blogsRouter