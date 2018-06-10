const express = require('express')
const fs = require('fs')
const meme = express.Router()
const mainRoute = '/meme'
const Genre = require('../models/GenreSchema')
const Meme = require('../models/MemeSchema')

meme.get('/add', (req, res) => {
    fs.readFile('./views/addMeme.html', (err, data) => {
      if (err) {
        console.log(err.message)
        return
      }
      Genre.find()
      .then((genres) => {
        let replacement = ''

        for (let genre of genres) {
          replacement += `<option value="${genre._id}">${genre.genreName}</option>`
        }
        data = data.toString().replace(`<div id="replaceMe">{{replaceMe2}}</div>`, replacement)
        res.write(data)
        res.end()
      })
    })
})

meme.post('/add', (req, res) => {
  new Meme({
    dateOfCreation: Date.now(),
    votes: 0,
    description: req.body.memeDescription,
    title: req.body.memeTitle,
    image: req.files.image
  }).save()
  .then(() => {
    res.redirect(mainRoute + '/all')
  })
})

meme.get('/all', (req, res) => {
  fs.readFile('./views/viewAll.html', (err, data) => {
    Meme.find()
    .then((memes) => {
      let replacement = ''
      for (let meme of memes) {
        let thumb = new Buffer(meme.image.data.buffer).toString('base64');
        replacement += `<div class="meme">
        <a href="${mainRoute}/details/:${meme._id}">
        <img class="memePoster" src="data:image/jpeg;base64,${thumb}"/>          
        </div>`
      }

      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replacement)
      res.write(data)
      res.end()
    })
  })
})

meme.get('/search', (req, res) => {
  fs.readFile('./views/searchMeme.html', (err, data) => {
    if (err) {
      console.log(err.message)
      return
    }
    Genre.find()
    .then((genres) => {
      let replacement = ''
      for (let genre of genres) {
        replacement += `<option value="${genre._id}">${genre.genreName}</option>`
      }
      data = data.toString().replace(`<div id="replaceMe">{{replaceMe}}</div>`, replacement)
      res.write(data)
      res.end()
    })
  })
})

meme.get('/details/:id', (req, res) => {
  Meme.findById(req.params.id.slice(1, req.params.id.length))
  .then((meme) => {
    fs.readFile('./views/details.html', (err, data) => {
      let thumb = new Buffer(meme.image.data.buffer).toString('base64');
      let replacement = `<div class="content">
      <img src="data:image/jpeg;base64,${thumb}"/>
      <h3>Title  ${meme.title}</h3>
      <p> ${meme.description}</p>
      </div>`
      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replacement)
      res.write(data)
      res.end()
    })
  })
})

let memeHandler = meme

module.exports = {
    mainRoute:mainRoute,
    handler:memeHandler
}