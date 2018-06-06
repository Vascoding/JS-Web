const express = require('express')
const Genre = require('../models/GenreSchema')
const genre = express.Router()
const mainRoute = '/genre'

genre.get('/add', (req, res) => {
    res.sendfile('./views/addGenre.html')
})

genre.post('/add', (req, res) => {
    console.log(req.body.genreName)

    new Genre({
        genreName: req.body.genreName,
        memeList: []
    })
    .save()
    .then(() => {
        res.redirect('/')
    })
})

let genreHandler = genre

module.exports = {
    mainRoute:mainRoute,
    handler:genreHandler
}