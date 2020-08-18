const
    socketIO = require('socket.io'),
    { SocketEvents, SocketActions, listenEvents } = require('../socket/events'),
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

        const { user } = socket

        if (!user) {

            log.error(`socket ${ socket.id } not authorized`)
            io.emit('error', { code: 401, message: 'Unauthorized' })
            return socket.disconnect(true)

        }

        log.info(`socket ${ socket.id } authorized`)

        socket
            .to(SocketRooms.ADMIN)
            .emit(SocketEvents.MESSAGE, { action: SocketActions.connected, payload: user })

        listenEvents({ socket, io })
        socketRoomAssignment(socket)

    })

}


module.exports = { initSocket }
