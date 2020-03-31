require('dotenv').config()

//config holds all variables

let PORT = process.env.PORT
let MONGODB_URI = process.env.mongoUrl
let TOKEN = process.env.TOKEN
if (process.env.NODE_ENV === 'test'){
    MONGODB_URI = process.env.TESTmongoUrl
}

module.exports = {
    PORT,
    MONGODB_URI,
    TOKEN
}