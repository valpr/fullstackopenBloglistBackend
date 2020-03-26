require('dotenv').config()

//config holds all variables

let PORT = process.env.PORT
let MONGODB_URI = process.env.mongoUrl

module.exports = {
    PORT,
    MONGODB_URI
}