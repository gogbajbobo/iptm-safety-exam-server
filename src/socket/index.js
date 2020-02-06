const
    socketIO = require('socket.io'),
    { SOCKET, listenEvents } = require('../socket/events'),
    auth = require('../services/auth')


const initSocket = http => {

    const io = socketIO(http)

    io.use((socket, next) => {

        auth.authSocket(socket)
        next()

    })

    io.on(SOCKET.CONNECTION, socket => {

        console.log(`socket ${ socket.id } connected`)

        const { user } = socket

        if (!user) {

            console.log(`socket ${ socket.id } not authorized`)
            socket.emit(SOCKET.AUTHORIZED, false)
            return socket.disconnect(true)

        }

        console.log(`socket ${ socket.id } authorized`)

        socket.emit(SOCKET.AUTHORIZED, user)

        listenEvents(socket)

    })

}


module.exports = { initSocket }
