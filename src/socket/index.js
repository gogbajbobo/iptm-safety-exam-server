const socketIO = require('socket.io')
const auth = require('../services/auth')
    { SOCKET, listenEvents } = require('../socket/events'),


const initSocket = http => {

    const io = socketIO(http)

    io.on(SOCKET.CONNECTION, socket => {

        console.log(`socket ${ socket.id } connected`)






        socket.on(
            SOCKET.LOGIN,
            (data, callback) => {

                console.log(`socket ${ socket.id } login: ${ JSON.stringify(data, null, '\t') }`)

                const { username, password } = data

                const user = auth.authUser({ username, password })

                callback(user)

            }
        )
        listenEvents(socket)

    })

}

module.exports = { initSocket }
