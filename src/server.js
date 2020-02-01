const
    express = require('express'),
    http = require('http')

const app = express()
const port = 8081
const server = http.createServer(app)

app.get('/', (req, res) => res.json({ error: false, message: 'SES server ok' }))

const startServer = () => {

    server.listen(port, () => {
        console.log(`SES server started at ${ new Date() } on *:${ port }`)
    })

}

module.exports = { startServer }
