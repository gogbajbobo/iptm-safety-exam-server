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

module.exports = {
    SocketEvents,
    SocketActions,
}
