
let fs = require('fs')

let staticHandler = (req, res) => {
    if (req.path.startsWith('/static/') || req.path.startsWith('/views')){
        fs.readFile('.' + req.path, (err, data) => {
            if (err) {
                console.log(err)
                return 
            }

            if (req.path.endsWith('.css')) {
                res.writeHead(200, {
                   'content-type': 'text/css'
                })
            } else if (req.path.endsWith('.js')) {
                res.writeHead(200, {
                    'content-type': 'application/javascript'
                })
            } else if (req.path.endsWith('.html')) {
                res.writeHead(200, {
                    'content-type': 'text/html'
                })
            } else if (req.path.endsWith('.png')) {
                res.writeHead(200, {
                    'content-type': 'image/png'
                })
            } else if (req.path.endsWith('.ico')) {
                res.writeHead(200, {
                    'content-type': 'image/x-icon'
                })
            } 

            res.write(data)
            res.end()
        })
        return
    } else {
        return true;
    }
}

module.exports = staticHandler