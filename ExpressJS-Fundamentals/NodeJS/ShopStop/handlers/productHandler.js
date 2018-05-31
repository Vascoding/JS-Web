const fs = require('fs')
const qs = require('querystring')
const multiparty = require('multiparty')
const shortid = require('shortid')
const http = require('http')
const Product = require('../models/Product')
const Category = require('../models/Category')

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
let productHandler = (req, res) => {
    if (req.path === '/product/add' && req.method === 'GET') {
        fs.readFile('./views/products/add.html', (err, data) => {
            if (err) {
                console.log(err.message)
                return
            }

            Category.find().then((categories) => {
                let replacement = `<select class="input-field" name="category">`

                for (let category of categories) {
                    replacement += `<option value="${category._id}">${category.name}</option>`
                }
                replacement += '</select>'

                let html = data.toString().replace('{categories}', replacement)
                res.write(html)
                res.end()
            })
        })
        return
    } else if (req.path === '/product/add' && req.method === 'POST') {
        
        let product = {}
        let form = new multiparty.Form();
 
        form.on('part', (part) => {
            if (part.filename){
                let dataString = ''
                let extension = part.filename.split('.').pop();
                
                part.setEncoding('binary')
                part.on('data', (data) => {
                    dataString += data
                })

                part.on('end', () => {
                    let fileName = shortid.generate()
                    let filePath = `./content/images/${fileName}.${extension}`
                    
                    product.image = filePath
                    fs.writeFile(`${filePath}`, dataString, {encoding: 'ascii'}, (err) => {
                        if (err) {
                            console.log(err.message)
                            return
                        }

                        res.writeHead(302, {
                            Location: '/'
                        })
    
                        res.end()
                    })
                })
            } else {
                part.setEncoding('utf-8')
                let field = ''
                part.on('data', (data) => {
                    field += data
                })
                part.on('end', () => {
                    product[part['name']] = field
                })
            }
        })
        form.on('close', () => {
            Product.create(product)
            .then((createdProduct) => {
                Category.findById(product.category)
                .then((category) => {
                    category.products.push(createdProduct._id)
                    category.save()
                    
                    res.writeHead(302, {
                        Location: '/'
                    })
        
                    res.end()
                })
               
            })
        })
        form.parse(req)
    } else {
        return true
    }
}

module.exports = productHandler