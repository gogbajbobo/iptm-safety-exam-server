const typeorm = require('typeorm')
const Exam = require('../datamodel/_model_names').exam
const { requestHandler } = require('./_helper')
const { CONNECTION_NAME } = require('../constants')


const ExamRepository = () => typeorm.getRepository(Exam, CONNECTION_NAME)

const getExams = ack => requestHandler(() => ExamRepository().find(), ack)

const createExam = (exam, ack) => requestHandler(() => ExamRepository().save(exam), ack)

const updateExam = (exam, ack) => requestHandler(() => ExamRepository().save(exam), ack)

const deleteExam = (id, ack) => requestHandler(() => ExamRepository().delete(id), ack)


module.exports = { getExams, createExam, updateExam, deleteExam }
