const
    socketIO = require('socket.io'),
    { SocketEvents, listenEvents } = require('../socket/events'),
    auth = require('../services/auth'),
    { log } = require('../services/logger')


const initSocket = http => {

    const io = socketIO(http)

    io.use((socket, next) => {

        auth.authSocket(socket)
        next()

    })


    io.on(SocketEvents.CONNECTION, socket => {

        const { user } = socket
        log.info(`socket ${ socket.id } connected`)

        if (!user) {

            log.error(`socket ${ socket.id } not authorized`)
            return socket.disconnect(true)

        }

        log.info(`socket ${ socket.id } authorized`)

        listenEvents({ socket, io })

    })

}


module.exports = { initSocket }
