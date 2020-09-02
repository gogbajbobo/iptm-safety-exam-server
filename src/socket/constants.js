const userRoles = require('../datamodel/_user_roles')

const SocketEvents = {

    CONNECTION: 'connection',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    DISCONNECTING: 'disconnecting',

    MESSAGE: 'message',

}

const SocketActions = {

    connected: 'connected',
    disconnected: 'disconnected',

    createExam: 'createExam',
    getExams: 'getExams',
    updateExam: 'updateExam',
    deleteExam: 'deleteExam',

    createQuestion: 'createQuestion',
    getQuestions: 'getQuestions',
    updateQuestion: 'updateQuestion',
    deleteQuestion: 'deleteQuestion',

    createAnswer: 'createAnswer',
    getAnswers: 'getAnswers',
    updateAnswer: 'updateAnswer',
    setAnswerAsCorrect: 'setAnswerAsCorrect',
    deleteAnswer: 'deleteAnswer',

}

const anyRoles = Object.values(userRoles)

const SocketActionsRoles = {

    connected: anyRoles,
    disconnected: anyRoles,

    createExam: [ userRoles.admin ],
    getExams: [ userRoles.admin, userRoles.examinee ],
    updateExam: [ userRoles.admin ],
    deleteExam: [ userRoles.admin ],

    createQuestion: [ userRoles.admin ],
    getQuestions: [ userRoles.admin, userRoles.examinee ],
    updateQuestion: [ userRoles.admin ],
    deleteQuestion: [ userRoles.admin ],

    createAnswer: [ userRoles.admin ],
    getAnswers: [ userRoles.admin ],
    updateAnswer: [ userRoles.admin ],
    setAnswerAsCorrect: [ userRoles.admin ],
    deleteAnswer: [ userRoles.admin ],

}


module.exports = {
    SocketEvents,
    SocketActions,
    SocketActionsRoles,
}
