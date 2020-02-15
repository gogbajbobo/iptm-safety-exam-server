const { log } = require('../services/logger')


const SocketEvents = {

    CONNECTION: 'connection',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    DISCONNECTING: 'disconnecting',

    MESSAGE: 'message',

}

const listenEvents = ({ socket, io }) => {

    [ SocketEvents.ERROR, SocketEvents.DISCONNECT, SocketEvents.DISCONNECTING ].forEach(event => {
        socket.on(event, data => log.info(`socket ${ socket.id } ${ event }: ${ data }`))
    })

    socket.on(SocketEvents.MESSAGE, message => {

        log.info(`socket ${ socket.id } message: ${ message }`)
        io.emit('message', message)

    })

}

module.exports = { SocketEvents, listenEvents }
