const socketIO = require('socket.io')
const auth = require('../services/auth')
    { SOCKET, listenEvents } = require('../socket/events'),


const initSocket = http => {

    const io = socketIO(http)

    io.on(SOCKET.CONNECTION, socket => {

        console.log(`socket ${ socket.id } connected`)











        listenEvents(socket)

    })

}

module.exports = { initSocket }
