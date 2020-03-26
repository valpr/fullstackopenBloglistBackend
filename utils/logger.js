//useful if implementing logging module
//rn it just console.logs anything it getse

const info = (...params) =>{
    console.log(...params)
}

const error = (...params) => console.error(...params)

module.exports = {info, error}