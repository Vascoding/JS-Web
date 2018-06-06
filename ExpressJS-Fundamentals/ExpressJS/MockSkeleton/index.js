const express = require('express')
const app = express()
const handlers = require('./handlers/handlerBlender')
const enviroment = process.env.NODE_ENV || 'development'
const config = require('./config/config')
const database = require('./config/db')
const port = 2323
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());
database(config[enviroment])

for (let handler of handlers) {
  app.use(handler.mainRoute, handler.handler)
}

app.listen(port, () => console.log(`Express running on port ${port}...`))
