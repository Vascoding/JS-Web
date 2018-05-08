const fs = require('fs')


let homeHandler = (req, res) => {
    if (req.path === '/home' || req.path === '/'){
        fs.readFile('./views/home.html', (err, data) => {
            if (err) {
                console.log(err)
                return 
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            })

            res.write(data)
            res.end() 
        })
    } else {
        return true
    }
}

module.exports = homeHandler