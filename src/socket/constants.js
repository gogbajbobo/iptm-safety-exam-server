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
const { admin, examinee } = userRoles

const SocketActionsRoles = {

    connected: anyRoles,
    disconnected: anyRoles,

    createExam: [ admin ],
    getExams: [ admin, examinee ],
    getExamById: [ examinee ],
    updateExam: [ admin ],
    deleteExam: [ admin ],

    createQuestion: [ admin ],
    getQuestions: [ admin, examinee ],
    updateQuestion: [ admin ],
    deleteQuestion: [ admin ],

    createAnswer: [ admin ],
    getAnswers: [ admin ],
    updateAnswer: [ admin ],
    setAnswerAsCorrect: [ admin ],
    deleteAnswer: [ admin ],

}


module.exports = {
    SocketEvents,
    SocketActions,
    SocketActionsRoles,
}
