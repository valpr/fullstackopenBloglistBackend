const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', {url: 1, title: 1, author: 1})
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    
    const testPassword =body.password && body.password.length >= 3 ? true : false
    const testUser =body.username &&  body.username.length >= 3 ? true : false
    if (!testUser || !testPassword){
        return response.status(400).json({error: "invalid user or pass"})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter