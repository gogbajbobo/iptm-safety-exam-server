const typeorm = require('typeorm')
const Exam = require('../datamodel/exam')
const { requestHandler } = require('./_helper')


const ExamRepository = () => typeorm.getRepository(Exam.Model, 'iptm-ses-db')

const getExams = ack => requestHandler(ExamRepository().find(), ack)

const createExam = (exam, ack) => requestHandler(ExamRepository().save(exam), ack)

const updateExam = (exam, ack) => requestHandler(ExamRepository().save(exam), ack)

const deleteExam = (id, ack) => requestHandler(ExamRepository().delete(id), ack)


module.exports = { getExams, createExam, updateExam, deleteExam }
