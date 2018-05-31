const fs = require('fs')
const routes = ['/', '/home', '/product/add', '/category/add']
const http = require('http')

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
let errorHandler = (req, res) => {
    if (!routes.includes(req.path)) {
            fs.readFile('./views/errors/pageNotFound.html', (err, data) => {
                if (err) {
                    console.log(err.message)
                    return
                }
                res.write(data)
                res.end()
            })
            return
        } else {
            return true
        }
}

module.exports = errorHandler