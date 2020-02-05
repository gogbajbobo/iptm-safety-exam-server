const socketIO = require('socket.io')
const { SOCKET } = require('../socket/events')
const auth = require('../services/auth')


const initSocket = http => {

    const io = socketIO(http)

    io.on(SOCKET.CONNECTION, socket => {

        console.log(`socket ${ socket.id } connected`)

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
        socket.on(
            SOCKET.LOGIN,
            (data, callback) => {

                console.log(`socket ${ socket.id } login: ${ JSON.stringify(data, null, '\t') }`)

                const { username, password } = data

                const user = auth.authUser({ username, password })

                callback(user)

            }
        )

    })

}

module.exports = { initSocket }
