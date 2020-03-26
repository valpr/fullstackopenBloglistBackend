const blogsRouter = require('express').Router()
const blogModel = require('../models/blog')

//blogsRouter handles all GET/POST requests

blogsRouter.get('/', (request, response, next ) => {
    blogModel
      .find({})
      .then(blogs => {
        response.json(blogs)
      }).catch (error => next(error))
  })
  
  blogsRouter.post('/', (request, response, next) => {
    const blog = new blogModel(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }).catch (error => next(error))
  })
module.exports = blogsRouter