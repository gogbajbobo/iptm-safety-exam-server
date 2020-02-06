const SOCKET = {

    CONNECTION: 'connection',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    DISCONNECTING: 'disconnecting',

    MESSAGE: 'message',
    LOGIN: 'login',

}

const listenEvents = socket => {

    socket.on(SOCKET.DISCONNECT, reason => {
        console.log(`socket ${ socket.id } disconnected with reason: ${ reason }`)
    })

    socket.on(SOCKET.ERROR, error => {
        console.error(`socket ${ socket.id } error: ${ error }`)
    })

    socket.on(SOCKET.DISCONNECTING, reason => {
        console.log(`socket ${ socket.id } disconnecting with reason: ${ reason }`)
    })

    socket.on(SOCKET.MESSAGE, message => {

        console.log(`socket ${ socket.id } message: ${ message }`)
        io.emit('message', message)

    })

}

module.exports = { SOCKET, listenEvents }
