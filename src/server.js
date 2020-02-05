const
    app = require('express')(),
    http = require('http').createServer(app),
    socket = require('./socket')

const port = 8081

app.get('/', (req, res) => res.json({ error: false, message: 'SES server ok' }))

const startServer = connection => {

    if (!connection) console.error('Have no connection to database')

    http.listen(port, () => {

        console.log(`SES server started at ${ new Date() } on *:${ port }`)
        socket.initSocket(http)

    })

}

module.exports = { startServer }
