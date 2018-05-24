let homeHandler = require('./homeHandler')
let staticHandler = require('./staticHandler')
let errorHandler = require('./errorHandler')
let productHandler = require('./productHandler')

module.exports = [homeHandler, staticHandler, errorHandler, productHandler]