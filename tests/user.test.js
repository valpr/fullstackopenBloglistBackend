const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

const initialUsers = [
    
    {
        "username":"ml2",
        "name":"ml2",
        "password":"ml2"
    },
    {
        "username":"ml3",
        "name":"ml3",
        "password":"ml3"
    }
]


beforeEach(async () =>{
    await User.deleteMany({})

    const userObjects = initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})


    
    test('test for invalid user', async () => {
        const before = await api.get('/')
        const noUser = 
        {
            "name":"ml4",
            "password":"ml4"
        }
        const noPassword = 
        {
            "username":"ml4",
            "name":"ml4",
        }
        const notLong = {
            "username":"ml4",
            "name":"ml4",
            "password":"ml"
        }
        await api.post('/api/blogs').send(noUser).expect(400)
        await api.post('/api/blogs').send(noPassword).expect(400)
        await api.post('/api/blogs').send(notLong).expect(400)

        const after = await api.get('/')

        expect(after.body.length).toBe(before.body.length)

    })






afterAll(async () => {
    mongoose.connection.close()
})