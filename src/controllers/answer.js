const typeorm = require('typeorm')
const Answer = require('../datamodel/_model_names').answer
const { requestHandler } = require('./_helper')


const AnswerRepository = () => typeorm.getRepository(Answer, 'iptm-ses-db')

const createAnswer = (answer, ack) => requestHandler(AnswerRepository().save(answer), ack)

const getAnswers = (filter, ack) => requestHandler(AnswerRepository().find(filter), ack)

const updateAnswer = (answer, ack) => requestHandler(AnswerRepository().save(answer), ack)

const deleteAnswer = (id, ack) => requestHandler(AnswerRepository().delete(id), ack)


module.exports = { createAnswer, getAnswers, updateAnswer, deleteAnswer }
