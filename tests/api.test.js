const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      
]

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects =initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('get all blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test('unique identifier property', async () =>{
    const response = await api.get('/api/blogs') //response is a LIST of blogs
    expect(response.body[0].id).toBeDefined()
})

test('create new blog', async () => {
    const before = await api.get('/api/blogs')
    const blogToAdd = new Blog({
        title: "my blog",
        author: "me",
        url: "mememememe.com",
        likes: 1,
    })
    await blogToAdd.save()
    const after = await api.get('/api/blogs')
    expect(after.body.length).toBe(before.body.length+1)
})

test('likes missing', async ()=>{
    const before = await api.get('/api/blogs')
    const blogToAdd = new Blog({
        title: "my blog",
        author: "me",
        url: "mememememe.com",
    })
    await blogToAdd.save()
    const after = await api.get('/api/blogs')
    const entry = after.body.find(blog => blogToAdd.id===blog.id)
    expect(entry.likes).toBe(0)
})

test('title and url missing', async () =>{
    const blogToAdd = new Blog({
        author: "me",
    })
    await api
        .post('/api/blogs')
        .send(blogToAdd)
        .expect(400)
    const notesAtEnd = await api.get('/api/blogs')
    expect(notesAtEnd.body.length).toBe(initialBlogs.length)
})

test('delete by ID', async () => {
    const before = await api.get('/api/blogs')

    await api
        .delete(`/api/blogs/${before.body[0].id}`)
        .expect(204)
    const after = await api.get('/api/blogs')
    expect(after.body.length).toBe(before.body.length-1)

})

test('update by ID', async () => {
    const before = await api.get('/api/blogs')
    let changed = before.body[0]
    changed.likes += 1
    await api
        .put(`/api/blogs/${before.body[0].id}`)
        .send(changed)
        .expect(200)
    
    const blogsAtEnd = await api.get('/api/blogs')
    const extraLike = blogsAtEnd.body.find(blog => changed.id === blog.id)

    expect(extraLike.likes).toBe(changed.likes)
})

afterAll(async () =>{
    mongoose.connection.close()
})