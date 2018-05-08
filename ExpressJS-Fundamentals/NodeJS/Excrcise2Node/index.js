const http = require('http')
const fs = require('fs')
const url = require('url')
const port = 1337
const handlers = require('./handlers/baseHandler')

http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname
    for (let i = 0; i < handlers.length; i++){
        let handler = handlers[i]
        let result = handler(req, res)
        if (i === handlers.length - 1 && result) {
            res.end()
        }
        if (!result){
            break
        }
    }
}).listen(port)

console.log('Server is listening on por 1337....')