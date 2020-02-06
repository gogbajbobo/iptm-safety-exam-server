const
    socketIO = require('socket.io'),
    { SOCKET, listenEvents } = require('../socket/events'),
    auth = require('../services/auth'),
    cookie = require('cookie')


const initSocket = http => {

    const io = socketIO(http)

    io.use((socket, next) => {

        const { handshake } = socket

        const { headers } = handshake
        const cookieObject = cookie.parse(headers.cookie)
        const { authJWT } = cookieObject

        if (authJWT) {

            socket.user = auth.checkJWT(authJWT)
            return next()

        }

        const { query } = handshake
        socket.user = auth.checkCredentials(query)

        next()

    })

    io.on(SOCKET.CONNECTION, socket => {

        console.log(`socket ${ socket.id } connected`)

        const { user } = socket

        if (!user) {

            socket.emit(SOCKET.AUTHORIZED, false)
            return socket.disconnect(true)

        }

        console.log(`socket user ${ user }`)

        socket.emit(SOCKET.AUTHORIZED, user)

        listenEvents(socket)

    })

}

module.exports = { initSocket }
