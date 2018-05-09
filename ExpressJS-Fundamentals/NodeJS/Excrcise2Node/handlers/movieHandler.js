const fs = require('fs')
const db = require('../config/dataBase.js')

let movieHandler = (req, res) => {
    let sortedMovies = Array.from(db).sort((a, b) => {
        return b.movieYear - a.movieYear
    })

    if (req.path === '/addMovie') {
        fs.readFile('./views/addMovie.html', (err, data) => {
            if (err) {
                console.log(err)
                return
            }

            if(req.method === 'POST') {
                let body = [];
                req.on('data', (chunk) => {
                  body.push(chunk);
                }).on('end', () => {
                  body = Buffer.concat(body).toString()
                  let movie = JSON.parse('{"' + decodeURI(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
                 
                  if (movie.movieTitle === '' || movie.movieDescription === '' || movie.moviePoster === '' || movie.movieYear === '') {
                    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>')
                    res.write(data)
                    res.end()
                  } else {
                    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>')
                    db.push(movie)
                    res.write(data)
                    res.end()
                  }
             })
            } else {
                res.write(data)
                res.end()
            }
        })
    } else if (req.path === '/viewAllMovies') {
        fs.readFile('./views/viewAll.html', (err, data) => {
            if (err) {
                console.log(err)
                return
            }  

            res.write(data)
            res.write(`<div class="container">`)

            let id = 0
            for (let movie of sortedMovies){
                res.write(`<div class="movie">
                <a href="/movies/details/${id++}"><img class="moviePoster" src="${unescape(movie.moviePoster)}" width="300px"/></a>          
              </div>`)
            }
            res.write('</div>')
            res.end()
        })
    } else if (req.path.startsWith('/movies/details/') && !isNaN(req.path.slice(16, req.path.length))) {
        let id = req.path.slice(16, req.path.length)
        let movie = sortedMovies[id]
        if (movie) {
            fs.readFile('./views/details.html', (err, data) => {
                if (err) {
                    console.log(err)
                    return
                }

                res.write(data)
                res.write(`<div class="content">`)
                res.write(`<img src="${unescape(movie.moviePoster)}" alt="" width="300px"/>`)
                res.write(`<h3>Title  ${replacePlus(unescape(movie.movieTitle))}</h3>`)
                res.write(`<h3>Year ${replacePlus(unescape(movie.movieYear))}</h3>`)
                res.write(`<p>${replacePlus(unescape(movie.movieDescription))}</p>`)
                res.write(`</div>`)
                res.end()
            })
        } else {
            return true
        }
        
    } else {
        return true
    }
}

function replacePlus (str) {
    str = str.replace(/\+/g, ' ')
    return str
}
module.exports = movieHandler