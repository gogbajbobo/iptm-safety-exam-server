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
    getExamById: 'getExamById',
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
    checkAnswers: 'checkAnswers',

    getExamResults: 'getExamResults',

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
    checkAnswers: [ examinee ],

    getExamResults: [ admin ],

}


module.exports = {
    SocketEvents,
    SocketActions,
    SocketActionsRoles,
}
