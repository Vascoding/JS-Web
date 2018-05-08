const homeHandler = require('./homeHandler.js')
const staticFileHandler = require('./staticFileHandler.js')
const movieHandler = require('./movieHandler.js')

let handlers = [ homeHandler, staticFileHandler, movieHandler ]

module.exports = handlers