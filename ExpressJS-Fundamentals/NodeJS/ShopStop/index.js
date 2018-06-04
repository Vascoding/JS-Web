const http = require('http')
const fs = require('fs')
const url = require('url')
const port = 1337
const baseHandler = require('./handlers/baseHandler')
const enviroment = process.env.NODE_ENV || 'development'
const config = require('./config/config')
const database = require('./config/database.config')

database(config[enviroment])

http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname
    for (let i = 0; i < baseHandler.length; i++) {
        if (baseHandler[i](req, res) !== true){
            break
        }
    }
}).listen(port)

console.log(`Server is listening on port ${port}....`)