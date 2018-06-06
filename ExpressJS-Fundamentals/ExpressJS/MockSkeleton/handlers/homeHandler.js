const express = require('express')
const home = express.Router()
const mainRoute = '/'

home.get('/', (req, res) => {
    res.sendfile('./views/home.html')
})

home.get('/home', (req, res) => {
    res.sendfile('./views/home.html')
})

let homeHandler = home

module.exports = {
    mainRoute:mainRoute,
    handler:homeHandler
}