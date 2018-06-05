
const Image = require('../models/ImageSchema')
const formidable = require('formidable')

let addImage = (req, res) => {
  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    
    fields.creationDate = Date.now()
    fields.tags = fields.tags.split(',').filter(t => t !== '')
    fields.tagsID = fields.tagsID.split(',').filter(t => t !== '')
    
    new Image(fields)
    .save()
    .then(() => {
      res.writeHead(302, {
        Location: '/'
      })

      res.end()
    })
  })
}

let deleteImg = (req, res) => {

}

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}
