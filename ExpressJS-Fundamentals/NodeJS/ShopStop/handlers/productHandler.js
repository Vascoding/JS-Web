let fs = require('fs')
let qs = require('querystring')
let db = require('../config/database')

let productHandler = (req, res) => {
    if (req.path === '/product/add' && req.method === 'GET') {
        fs.readFile('./views/products/add.html', (err, data) => {
            if (err) {
                console.log(err.message)
                return
            }
            res.write(data)
            res.end()
        })
        return
    } else if (req.path === '/product/add' && req.method === 'POST') {
        let dataString = ''

        req.on('data', (data) => {
            dataString += data
        })

        req.on('end', () => {
            let product = qs.parse(dataString)
            db.add(product)

            res.writeHead(302, {
                Location: '/'
            })
            res.end()
        })
    } else {
        return true
    }
}

module.exports = productHandler