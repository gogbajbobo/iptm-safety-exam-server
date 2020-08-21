const typeorm = require('typeorm')
const Question = require('../datamodel/question')
const { requestHandler } = require('./_helper')


const QuestionRepository = () => typeorm.getRepository(Question.Model, 'iptm-ses-db')

const createQuestion = (question, ack) => requestHandler(QuestionRepository().insert(question), ack)

const getQuestions = (filter, ack) => requestHandler(QuestionRepository().find(filter), ack)

const deleteQuestion = (id, ack) => requestHandler(QuestionRepository().delete(id), ack)


module.exports = { createQuestion, getQuestions, deleteQuestion }
