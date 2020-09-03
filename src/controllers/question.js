const typeorm = require('typeorm')
const Question = require('../datamodel/_model_names').question
const { requestHandler } = require('./_helper')


const QuestionRepository = () => typeorm.getRepository(Question, 'iptm-ses-db')

const createQuestion = (question, ack) => requestHandler(() => QuestionRepository().save(question), ack)

const getQuestions = ({ role, filter }, ack) => requestHandler(() => {


        return QuestionRepository().find(filter)
}, ack)

const updateQuestion = (question, ack) => requestHandler(() => QuestionRepository().save(question), ack)

const deleteQuestion = (id, ack) => requestHandler(() => QuestionRepository().delete(id), ack)


module.exports = { createQuestion, getQuestions, updateQuestion, deleteQuestion }
