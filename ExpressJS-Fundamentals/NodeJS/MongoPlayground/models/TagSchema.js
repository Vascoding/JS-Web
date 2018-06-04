const mongoose = require('mongoose')

let tagSchema = mongoose.Schema({
    name: {type: String, required: true},
    creationDate: {type: Date},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}]
})

tagSchema.virtual('toLower').get(function () {
    return this.name.toLowerCase()
})

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag