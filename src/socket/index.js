const
    socketIO = require('socket.io'),
    { SocketEvents, listenEvents } = require('../socket/events'),
    auth = require('../services/auth'),
    { log } = require('../services/logger'),
    { SocketRooms, socketRoomAssignment } = require('../socket/rooms')


const initSocket = http => {

    const io = socketIO(http)
    applySocketMiddleware(io)
    handleSocketConnection(io)

}

const applySocketMiddleware = io => {

    io.use((socket, next) => {

        auth.authSocket(socket)
        next()

    })

}

const handleSocketConnection = io => {

    io.on(SocketEvents.CONNECTION, socket => {

        log.info(`socket ${ socket.id } connected`)

        if (!socket.user) {

            log.error(`socket ${ socket.id } not authorized`)
            return socket.disconnect(true)

        }

        log.info(`socket ${ socket.id } authorized`)

        listenEvents({ socket, io })
        socketRoomAssignment(socket)

    })

}


module.exports = { initSocket }
