const homeHandler = require('./homeHandler')
const staticHandler = require('./staticHandler')
const errorHandler = require('./errorHandler')
const productHandler = require('./productHandler')
const categoryHandler = require('./categoryHandler')

module.exports = [homeHandler, staticHandler, errorHandler, productHandler, categoryHandler]