const fs = require('fs')
const db = require('../config/dataBase.js')

let movieHandler = (req, res) => {
    if (req.path === '/addMovie') {
        fs.readFile('./views/addMovie.html', (err, data) => {
            if (err) {
                console.log(err)
                return
            }


            res.write(data)
            res.end()
        })
    } else if (req.path === '/viewAllMovies') {
        fs.readFile('./views/viewAll.html', (err, data) => {
            if (err) {
                console.log(err)
                return
            }  
            data.replaceMe = db

            res.write(data)
            res.write(`<div class="container">`)

            for (let movie of db){
                res.write(`<div class="movie">
                <img class="moviePoster" src="${movie.moviePoster}" width="300px"/>          
              </div>`)
            }
            res.write('</div>')
            res.end()
        })
    } else if (req.path === '/movies/details/?id') {
        fs.readFile('./views/details.html', (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            
            res.write(data)
            res.end()
        })
    } else {
        return true
    }
}

module.exports = movieHandler