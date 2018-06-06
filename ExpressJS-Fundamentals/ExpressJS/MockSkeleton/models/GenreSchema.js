const mongoose = require('mongoose')

let genreSchema = mongoose.Schema({
    genreName: {type: String, require: true, unique: true},
    memeList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Meme'}]
})

let Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre