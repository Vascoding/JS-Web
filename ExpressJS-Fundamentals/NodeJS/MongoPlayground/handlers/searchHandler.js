const Image = require('../models/ImageSchema')
const fs = require('fs')

let searchImages = (req, res) => {
  if (req.pathquery.tagName === '' && req.pathquery.afterDate === '' && req.pathquery.beforeDate === '' && req.pathquery.Limit === '') {
    fs.readFile('./views/results.html', (err, data) => {
      if (err) {
        console.log(err.message)
        return
      }
      
      Image.find()
      .sort({creationDate: -1})
      .then((images) => {
        renderFoundImages(res, data, images)
      })
    })
  } else {
    fs.readFile('./views/results.html', (err, data) => {
      if (err) {
        console.log(err.message)
        return
      }

      let beforeDate = req.pathquery.beforeDate ? req.pathquery.beforeDate : Date.now()
      let afterDate = req.pathquery.afterDate ? req.pathquery.afterDate : new Date(0, 0, 0)
      let limit = req.pathquery.Limit ? Number(req.pathquery.Limit) : 10

      if (req.pathquery.tagName !== '') {
        let tagNames = req.pathquery.tagName.split(',').filter(t => t !== '')
        
        Image.find({
          tags: { $in: tagNames}
        })
        .sort({creationDate: -1})
        .then((images) => {
          renderFoundImages(res, data, images)
        })
      } else {
        Image.find({})
        .where('creationDate')
        .gt(afterDate)
        .lt(beforeDate)
        .sort({creationDate: -1})
        .limit(limit)
        .then((images) => {
          renderFoundImages(res, data, images)
        })
      }
    })
  }
}

let deleteImage = (req, res) => {
  let id = req.pathquery.id
  Image.findByIdAndRemove(id, () => {
    res.writeHead(302, {
      Location: '/'
    })

    res.end()
  })
}

let renderFoundImages = (res, data, images) => {
  let replacement = ''
        for (let image of images) {
          replacement += `<fieldset id => <legend>${image.imageTitle}:</legend> 
          <img src="${image.imageUrl}">
          </img><p>${image.description}<p/>
          <button onclick=location.href="/delete?id=${image._id}" class="deleteBtn">Delete</button> 
          </fieldset>`
        }
        data = data.toString().replace('<div class=\'replaceMe\'></div>', replacement)
        res.write(data)
        res.end()
}

module.exports = (req, res) => {
  if (req.pathname === '/search' && Object.keys(req.pathquery).length !== 0) {
   searchImages(req, res)
  } else if (req.pathname === '/delete') {
    deleteImage(req, res)
  } else {
    return true
  }
}
