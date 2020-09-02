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

    createExam: 'create exam',
    getExams: 'get exams',
    updateExam: 'update exam',
    deleteExam: 'delete exam',

    createQuestion: 'create question',
    getQuestions: 'get questions',
    updateQuestion: 'update question',
    deleteQuestion: 'delete question',

    createAnswer: 'create answer',
    getAnswers: 'get answers',
    updateAnswer: 'update answer',
    setAnswerAsCorrect: 'set answer as correct',
    deleteAnswer: 'delete answer',

}

module.exports = {
    SocketEvents,
    SocketActions,
}
