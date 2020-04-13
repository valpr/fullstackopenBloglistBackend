const blogsRouter = require('express').Router()
const blogModel = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//blogsRouter handles all GET/POST requests

blogsRouter.get('/', async (request, response) => {
  const blogs = await blogModel.find({})
    .populate('user', {name: 1, username: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  //TOKEN AUTH
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)
  //CREATE BLOG OBJ
  const blog = new blogModel({...request.body, user: user._id})
  
  //BLOG ERROR CHCK
  if (!blog.title || !blog.url)
      response.status(400).json({error: "No title or URL"})
  else{
    //PUT IN DB
    await blog.save()
    const result = await blogModel.findById(blog._id).populate('user', {name: 1, username: 1})
    user.blogs = user.blogs.concat(result._id) //adds blog id to user as well
    await user.save()
    console.log(result)
    response.status(200).json(result.toJSON())
  }
})

blogsRouter.delete('/:id', async(request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  
  const blog = await blogModel.findById(request.params.id)
  if (!blog){
    response.status(404).end()
  }
  else if (blog.user.toString() === decodedToken.id){ //TO TEST
    await blogModel.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else{ //doesn't match the response token
    response.status(403).end()
  }

  response.status(204).end()
})


blogsRouter.put('/:id', async(request, response) => {
  const updatedBlog = await blogModel
  .findByIdAndUpdate(request.params.id, request.body, {new:true})
    .populate('user', {name: 1, username: 1})
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter