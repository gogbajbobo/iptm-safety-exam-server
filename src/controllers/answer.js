const typeorm = require('typeorm')
const Answer = require('../datamodel/_model_names').answer
const { requestHandler } = require('./_helper')
const { CONNECTION_NAME } = require('../constants')


const AnswerRepository = () => typeorm.getRepository(Answer, CONNECTION_NAME)

const createAnswer = (answer, ack) => requestHandler(() => AnswerRepository().save(answer), ack)

const getAnswers = (filter, ack) => requestHandler(() => AnswerRepository().find(filter), ack)

const updateAnswer = (answer, ack) => requestHandler(() => AnswerRepository().save(answer), ack)

const setAnswerAsCorrect = (answer, ack) => {

    const { id, question } = answer
    AnswerRepository().find({ question })
        .then(answers => answers.map(a => ({ ...a, isCorrect: a.id === id })))
        .then(answers => requestHandler(() => AnswerRepository().save(answers), ack))

}

const deleteAnswer = (id, ack) => requestHandler(() => AnswerRepository().delete(id), ack)


module.exports = { createAnswer, getAnswers, updateAnswer, setAnswerAsCorrect, deleteAnswer }
