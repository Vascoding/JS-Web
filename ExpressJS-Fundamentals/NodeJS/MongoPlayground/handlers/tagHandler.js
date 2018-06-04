const Tag = require('../models/TagSchema')
const formidable = require('formidable')

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let form = new formidable.IncomingForm()

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err.message)
        return
      }

      new Tag({name: fields['tagName'], creationDate: Date.now()})
      .save()
      .then(() => {
        res.writeHead(302, {
          Location: '/'
        })

        res.end()
      })
    })
    
  } else {
    return true
  }
}
