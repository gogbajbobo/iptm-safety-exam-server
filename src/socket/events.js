const { log } = require('../services/logger')


const SocketEvents = {

    CONNECTION: 'connection',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    DISCONNECTING: 'disconnecting',

    MESSAGE: 'message',

}

const listenEvents = ({ socket, io }) => {

    socket.on(SocketEvents.DISCONNECT, reason => {
        log.info(`socket ${ socket.id } disconnected with reason: ${ reason }`)
    })

    socket.on(SocketEvents.ERROR, error => {
        log.info(`socket ${ socket.id } error: ${ error }`)
    })

    socket.on(SocketEvents.DISCONNECTING, reason => {
        log.info(`socket ${ socket.id } disconnecting with reason: ${ reason }`)
    })

    socket.on(SocketEvents.MESSAGE, message => {

        log.info(`socket ${ socket.id } message: ${ message }`)
        io.emit('message', message)

    })

}

module.exports = { SocketEvents, listenEvents }
