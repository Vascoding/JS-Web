const db = require('../config/dataBase')
const fs = require('fs')
const qs = require('querystring')
const url = require('url')
const http = require('http')
const formidable = require('formidable')
const shortid = require('shortid')

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
let viewAll = (req, res) => {
  fs.readFile('./views/viewAll.html', (err, data) => {
    if (err) {
      console.log(err.message)
      return
    }
    let replacement = ''
    let memes = db.getDb().sort((a, b) => {
      return b.dateStamp - a.dateStamp
    })

    for (let meme of memes.filter(m => m.privacy === 'on')) {
      replacement += `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/>          
  	  </div>`
    }

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replacement)

    res.write(data)
    console.log(res)
    res.end()
  })
}

let viewAddMeme = (req, res) => {
  fs.readFile('./views/addMeme.html', (err, data) => {
    if (err) {
      console.log(err.message)
      return
    }

    res.write(data)
    res.end()
  })
}

let addMeme = (req, res) => {
 let form = new formidable.IncomingForm()

 form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err.message)
      return
    }

    let file = files.meme
    let tempPath = file.path
    let fileName = shortid.generate()  
    let memeSrc = './public/memeStorage/1/' + fileName + '.jpg'
    fs.rename(tempPath, memeSrc, (err) => {
       if (err) {
        console.log(err.message)
        return
       }

       let id = shortid.generate()
       let title = fields.memeTitle
       let description = fields.memeDescription
       let privacy = fields.status || 'off'
       let dateStamp = Date.now()
       
       let meme = {
         id: id,
         title: title,
         memeSrc: memeSrc,
         description: description,
         privacy: privacy,
         dateStamp: Date.now()
       }
    
        db.add(meme)
        db.save()

        res.writeHead(302, {
          Location: '/viewAllMemes'
        })

        res.end()
   })
 })    
}

let getDetails = (req, res) => {
  fs.readFile('./views/details.html', (err, data) => {
    if (err) {
      console.log(err.message)
      return
    }
    let queryData = qs.parse(url.parse(req.url).query)
    
    let targetedMeme = db.findById(queryData.id)
    
    let replacement = `<div class="content">
    <img src="${targetedMeme.memeSrc}" alt=""/>
    <h3>Title  ${targetedMeme.title}</h3>
    <p> ${targetedMeme.description}</p>
    <button><a href="${targetedMeme.memeSrc}" download>Download Meme</a></button>
    </div>`

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replacement)

    res.write(data)
    res.end()
  })
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}
