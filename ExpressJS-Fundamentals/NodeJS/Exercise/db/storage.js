let fs = require('fs')

let db = {}
let put = (key, value) => {
    if (typeof(key) !== 'string'){
        throw new Error('Key must be string')
    }
    
    if (db.hasOwnProperty(key)) {
        throw new Error('Key already exists')
    }

    db[key] = value
}

let get = (key, callback) => {
    if (typeof(key) !== 'string'){
        throw new Error('Key must be string')
    }
    
    if (!db.hasOwnProperty(key)) {
        throw new Error('Key is not present in the storage')
    }
    
    callback(db[key])
}

let getAll = (callback) => {
    if (Object.values(db).length === 0){
         callback('There are no items in the storage')
    } else {
         callback(db)
    }
}

let update = (key, value) => {
    if (typeof(key) !== 'string'){
        throw new Error('Key must be string')
    }
    
    if (!db.hasOwnProperty(key)) {
        throw new Error('Key is not present in the storage')
    }

    db[key] = value;
}

let deleteItem = (key) => {
    if (typeof(key) !== 'string'){
        throw new Error('Key must be string')
    }
    
    if (!db.hasOwnProperty(key)) {
        throw new Error('Key is not present in the storage')
    }

    delete db[key]
}

let clear = () => {
    db = {}
}

let save = () => {
    let data = JSON.stringify(db)
    fs.writeFile('./storage.json', data, function (err) {
        if (err){
            throw new Error('Data could not be saved!')
        }
    })
}

let load = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./storage.json', 'utf8', (err, data) => {
            if (err){
                callback('storage.json not found!')
            }
    
            db = JSON.parse(data)
            resolve()
        })
    })
}

module.exports = {
    put,
    get,
    getAll,
    update,
    deleteItem,
    clear,
    save,
    load,
}