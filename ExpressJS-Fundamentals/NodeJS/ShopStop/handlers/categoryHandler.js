const fs = require('fs')
const qs = require('querystring')
const url = require('url')
const http = require('http')
const Category = require('../models/Category')
/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
let categoryHandler = (req, res) => {
    if (req.path === '/category/add' && req.method === 'GET') {
            fs.readFile('./views/category/add.html', (err, data) => {
                if (err) {
                    console.log(err.message)
                    return
                }
                res.write(data)
                res.end()
            })
            return
    } else if (req.path === '/category/add' && req.method === 'POST') {
        let queryData = ''
        req.on('data', (data) => {
            queryData += data
        })

        req.on('end', () => {
            let category = qs.parse(queryData)
            Category.create(category).then(() => {
                res.writeHead(302, {
                    Location: '/'
                })
    
                res.end()
            })
        })
    } else {
        return true
    }
}

module.exports = categoryHandler