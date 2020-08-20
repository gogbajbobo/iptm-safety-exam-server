const { log } = require('../services/logger')
const { SocketRooms } = require('../socket/rooms')

const { createExam, getExams, updateExam, deleteExam } = require('../controllers/exam')
const { createQuestion } = require('../controllers/question')

const SocketEvents = {

    CONNECTION: 'connection',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    DISCONNECTING: 'disconnecting',

    MESSAGE: 'message',

}

const SocketActions = {

    login: 'login',
    logout: 'logout',

    connected: 'connected',
    disconnected: 'disconnected',

    createExam: 'create exam',
    getExams: 'get exams',
    updateExam: 'update exam',
    deleteExam: 'delete exam',

    createQuestion: 'create question',

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
        socket
            .to(SocketRooms.ADMIN)
            .emit(SocketEvents.MESSAGE, { action: SocketActions.disconnected, payload: socket.user })
            .removeAllListeners()

    })

}

const messageEventHandler = ({ socket, io }) => {

    socket.on(SocketEvents.MESSAGE, (message, ack) => {

        const { action, payload } = message

        log.debug(`socket ${ socket.id } ${ SocketEvents.MESSAGE }: ${ action }`)

        actionsHandler(action, payload, ack)

    })

}

const actionsHandler = (action, payload, ack) => {

    switch (action) {

        case SocketActions.createExam:      return createExam(payload, ack)
        case SocketActions.getExams:        return getExams(ack)
        case SocketActions.updateExam:      return updateExam(payload, ack)
        case SocketActions.deleteExam:      return deleteExam(payload, ack)

        case SocketActions.createQuestion:  return createQuestion(payload, ack)

        default:                            return ack({ error: 'incorrect action' })

    }

}

module.exports = { SocketEvents, SocketActions, listenEvents }
