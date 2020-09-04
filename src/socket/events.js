const typeorm = require('typeorm')
const { CONNECTION_NAME } = require('../constants')

const { log } = require('../services/logger')
const { SocketRooms } = require('../socket/rooms')
const { SocketEvents, SocketActions, SocketActionsRoles } = require('./constants')

const { createExam, getExams, getExamById, updateExam, deleteExam } = require('../controllers/exam')
const { createQuestion, getQuestions, updateQuestion, deleteQuestion } = require('../controllers/question')
const { createAnswer, getAnswers, updateAnswer, setAnswerAsCorrect, deleteAnswer } = require('../controllers/answer')


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

    const connection = typeorm.getConnection(CONNECTION_NAME)

    socket.on(SocketEvents.MESSAGE, (message, ack) => {

        const { roles } = socket.user
        const { action, payload } = message
        const requiredRoles = SocketActionsRoles[action]

        log.debug(`socket ${ socket.id } ${ SocketEvents.MESSAGE }: ${ action }`)

        if (!roles)
            return ack({ error: 'user w/o roles' })

        if (!requiredRoles)
            return ack({ error: `no required roles for ${ action }` })

        if (!requiredRoles.some(role => roles.includes(role))) {

            log.error(`user ${ socket.user } have no required roles for ${ action }`)
            io.emit('error', { code: 403, message: 'Forbidden' })
            return ack({ error: 'Forbidden' })

        }

        if (!connection.isConnected)
            return ack({ error: 'database is not connected' })

        return actionsHandler({ action, payload, ack })

    })

}

const actionsHandler = ({ action, payload, ack }) => {

    switch (action) {

        case SocketActions.createExam:          return createExam(payload, ack)
        case SocketActions.getExams:            return getExams(ack)
        case SocketActions.getExamById:         return getExamById(payload, ack)
        case SocketActions.updateExam:          return updateExam(payload, ack)
        case SocketActions.deleteExam:          return deleteExam(payload, ack)

        case SocketActions.createQuestion:      return createQuestion(payload, ack)
        case SocketActions.getQuestions:        return getQuestions(payload, ack)
        case SocketActions.updateQuestion:      return updateQuestion(payload, ack)
        case SocketActions.deleteQuestion:      return deleteQuestion(payload, ack)

        case SocketActions.createAnswer:        return createAnswer(payload, ack)
        case SocketActions.getAnswers:          return getAnswers(payload, ack)
        case SocketActions.updateAnswer:        return updateAnswer(payload, ack)
        case SocketActions.setAnswerAsCorrect:  return setAnswerAsCorrect(payload, ack)
        case SocketActions.deleteAnswer:        return deleteAnswer(payload, ack)

        default:                                return ack({ error: 'incorrect action' })

    }

}

module.exports = { SocketEvents, SocketActions, listenEvents }
