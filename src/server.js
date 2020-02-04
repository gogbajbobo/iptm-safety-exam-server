const
    app = require('express')(),
    http = require('http').createServer(app),
    io = require('socket.io')(http)

const port = 8081

app.get('/', (req, res) => res.json({ error: false, message: 'SES server ok' }))

const startServer = connection => {

    if (!connection) console.error('Have no connection to database')

    http.listen(port, () => {
        console.log(`SES server started at ${ new Date() } on *:${ port }`)
    })

    io.on('connection', socket => {

        console.log(`a user ${ socket.id } connected`)

        socket.on('disconnect', () => {
            console.log(`user ${ socket.id } disconnected`)
        })

        socket.on('message', message => {

            console.log(`${ socket.id } message: ${ message }`)
            io.emit('message', message)

        })
        socket.on(
            'login',
            data => console.log(`${ socket.id } login: ${ JSON.stringify(data, null, '\t') }`)
        )

    })

}

module.exports = { startServer }
