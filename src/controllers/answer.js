const typeorm = require('typeorm')
const Answer = require('../datamodel/_model_names').answer
const { requestHandler } = require('./_helper')


const AnswerRepository = () => typeorm.getRepository(Answer, 'iptm-ses-db')

const createAnswer = (answer, ack) => requestHandler(AnswerRepository().save(answer), ack)

const getAnswers = (filter, ack) => requestHandler(AnswerRepository().find(filter), ack)

// const updateQuestion = (question, ack) => requestHandler(QuestionRepository().save(question), ack)

// const deleteQuestion = (id, ack) => requestHandler(QuestionRepository().delete(id), ack)


module.exports = { createAnswer, getAnswers/*, updateQuestion, deleteQuestion */ }
