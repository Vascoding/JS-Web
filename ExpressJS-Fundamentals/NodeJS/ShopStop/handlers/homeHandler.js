const fs = require('fs')
const qs = require('querystring')
const url = require('url')
const http = require('http')
const Product = require('../models/Product')

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
let homeHandler = (req, res) => {
    if (req.path === '/home' || req.path === '/'|| req.path === '' && req.method === 'GET') {
        fs.readFile('./views/home/index.html', (err, data) => {
            if (err){
                console.log(err.message)
                return
            }
            let queryData = qs.parse(url.parse(req.url).query)
            let content = ''
            Product.find().then((products) => {
                if (queryData.query) {
                    products = products.filter(p => p.name.toLowerCase().includes(queryData.query.toLowerCase()))
                }

                for (let product of products) {
                    content += `<div class="product-card">
                    <img class="product-img" src="${product.image}" alt="Product Image">
                    <h2>${product.name}</h2>
                    <h2>${product.price}</h2>
                    <p>${product.description}</p>
                  </div>`
               }
   
               let html = data.toString().replace('{content}', content)
   
               res.write(html)
               res.end()
            })
        })
        return
    } else {
        return true
    }
}

module.exports = homeHandler