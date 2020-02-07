const
    app = require('express')(),
    http = require('http').createServer(app),
    socket = require('./socket'),
    passport = require('./services/passport'),
    router = require('./routes'),
    { requestLoggers, log } = require('./services/logger')


const port = 8081

requestLoggers.forEach(logger => app.use(logger))

app.use(passport.initialize())
app.use(router)

const startServer = connection => {

    if (!connection) log.error('Have no connection to database')

    http.listen(port, () => {

        log.info(`SES server started at ${ new Date() } on *:${ port }`)
        socket.initSocket(http)

    })

}

module.exports = { startServer }
