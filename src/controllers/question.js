const typeorm = require('typeorm')
const Question = require('../datamodel/question')


const QuestionRepository = () => typeorm.getRepository(Question.Model, 'iptm-ses-db')

const createQuestion = (question, ack) => {

    return QuestionRepository().insert(question)
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}

const getQuestions = (filter, ack) => {

    return QuestionRepository().find(filter)
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}

const deleteQuestion = (id, ack) => {

    return QuestionRepository().delete(id)
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}


module.exports = { createQuestion, getQuestions, deleteQuestion }
