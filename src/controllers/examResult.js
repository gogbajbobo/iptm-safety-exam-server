const typeorm = require('typeorm')
const ExamResult = require('../datamodel/_model_names').examResult
const { requestHandler } = require('./_helper')
const { CONNECTION_NAME } = require('../constants')


const ExamResultRepository = () => typeorm.getRepository(ExamResult, CONNECTION_NAME)

const getExamResults = ack => requestHandler(() => ExamResultRepository().find(), ack)


module.exports = { getExamResults }
