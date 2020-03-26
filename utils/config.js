require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.mongoUrl

module.exports = {
    PORT,
    MONGODB_URI
}