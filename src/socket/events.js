const SocketEvents = {

    CONNECTION: 'connection',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    DISCONNECTING: 'disconnecting',

    MESSAGE: 'message',

}

const listenEvents = ({ socket, io }) => {

        console.log(`socket ${ socket.id } disconnected with reason: ${ reason }`)
    socket.on(SocketEvents.DISCONNECT, reason => {
    })

        console.error(`socket ${ socket.id } error: ${ error }`)
    socket.on(SocketEvents.ERROR, error => {
    })

        console.log(`socket ${ socket.id } disconnecting with reason: ${ reason }`)
    socket.on(SocketEvents.DISCONNECTING, reason => {
    })

    socket.on(SocketEvents.MESSAGE, message => {

        console.log(`socket ${ socket.id } message: ${ message }`)
        io.emit('message', message)

    })

}

module.exports = { SocketEvents, listenEvents }
