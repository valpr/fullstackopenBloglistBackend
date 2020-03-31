const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        minlength: 3,
        unique: true
    },
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})


userSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(validator)

const User  = mongoose.model('User', userSchema)

module.exports = User