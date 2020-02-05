const socketIO = require('socket.io')
const auth = require('../services/auth')


const initSocket = http => {

    const io = socketIO(http)

    io.on('connection', socket => {

        console.log(`socket ${ socket.id } connected`)

        socket.on('disconnect', reason => {
            console.log(`socket ${ socket.id } disconnected with reason: ${ reason }`)
        })

        socket.on('error', error => {
            console.error(`socket ${ socket.id } error: ${ error }`)
        })

        socket.on('disconnecting', reason => {
            console.log(`socket ${ socket.id } disconnecting with reason: ${ reason }`)
        })

        socket.on('message', message => {

            console.log(`socket ${ socket.id } message: ${ message }`)
            io.emit('message', message)

        })
        socket.on(
            'login',
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
