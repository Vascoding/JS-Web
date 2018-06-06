const mongoose = require('mongoose')

let memeSchema = mongoose.Schema({
    dateOfCreation: {type: Date},
    votes: {type: Number},
    description: {type: String},
    title: {type: String},
    image: {type: Object}
})

let Meme = mongoose.model('Meme', memeSchema)

module.exports = Meme