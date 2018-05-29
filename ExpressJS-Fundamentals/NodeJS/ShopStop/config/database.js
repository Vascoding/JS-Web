const fs = require('fs')
const path = require('path')
const dbPath = path.join('./config', '/database.json')

function getProducts() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, '[]')
        return []
    }

    let json = fs.readFileSync(dbPath).toString() || '[]'
    let products = JSON.parse(json)
    return products
}

function saveProducts(products) {
    let json = JSON.stringify(products)
    fs.writeFileSync(dbPath, json)
}

let add = (product) => {
    let products = getProducts()
    product.id = products.length + 1
    products.push(product)
    saveProducts(products)
}

let getAll = getProducts

let findByName = (name) => {
    return getProducts().filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
}

module.exports = {add, getAll, findByName}