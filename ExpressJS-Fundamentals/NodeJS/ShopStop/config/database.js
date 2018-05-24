let products = []
let count = 0

let add = (product) => {
    products.push(product)
    count++
}

let getAll = () => {
    return products
}

let findByName = (name) => {
    return products.find(p => p.name === name)
}

module.exports = {add, getAll, findByName}