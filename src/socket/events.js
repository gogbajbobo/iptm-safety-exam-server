const { log } = require('../services/logger')
const { SocketRooms } = require('../socket/rooms')


const SocketEvents = {

    CONNECTION: 'connection',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    DISCONNECTING: 'disconnecting',

    MESSAGE: 'message',

}

const listenEvents = ({ socket, io }) => {

    [ disconnectingEventHandler, errorEventHandler, disconnectEventHandler ]
        .forEach(eh => eh(socket))

    messageEventHandler({ socket, io })

}

const errorEventHandler = socket => {

    socket.on(SocketEvents.ERROR, error => {
        log.error(`socket ${ socket.id } ${ SocketEvents.ERROR }: ${ error }`)
    })

}

const disconnectingEventHandler = socket => {

    socket.on(SocketEvents.DISCONNECTING, reason => {
        log.debug(`socket ${ socket.id } ${ SocketEvents.DISCONNECTING }: ${ reason }`)
    })

}

const disconnectEventHandler = socket => {

    socket.on(SocketEvents.DISCONNECT, reason => {

        log.info(`socket ${ socket.id } ${ SocketEvents.DISCONNECT }: ${ reason }`)
        socket.to(SocketRooms.ADMIN).emit(SocketEvents.MESSAGE, { title: 'user disconnected', payload: socket.user })
        socket.removeAllListeners()

    })

}

const messageEventHandler = ({ socket, io }) => {

    socket.on(SocketEvents.MESSAGE, message => {

        log.debug(`socket ${ socket.id } ${ SocketEvents.MESSAGE }: ${ message }`)
        io.emit('message', message)

    })

}

module.exports = { SocketEvents, listenEvents }
