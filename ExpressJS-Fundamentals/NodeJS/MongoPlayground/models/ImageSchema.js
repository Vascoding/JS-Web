const mongoose = require('mongoose')

let imageSchema = mongoose.Schema({
    imageUrl: {type: String, required: true},
    imageTitle: {type: String},
    creationDate: {type: Date},
    description: {type: String},
    tags: [{type: String}],
    tagsID: [{type: String}],
})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image