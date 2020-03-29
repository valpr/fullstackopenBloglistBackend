const blogsRouter = require('express').Router()
const blogModel = require('../models/blog')

//blogsRouter handles all GET/POST requests

blogsRouter.get('/', async (request, response) => {
  const blogs = await blogModel.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new blogModel(request.body)
    if (!blog.title || !blog.url)
      response.status(400).json({error: "No title or URL"})
    else{
      const result = await blog.save()
      response.status(201).json(result)
    }
})

blogsRouter.delete('/:id', async(request, response) => {
  await blogModel.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async(request, response) => {
  const updatedBlog = await blogModel.findByIdAndUpdate(request.params.id, request.body, {new:true})
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter