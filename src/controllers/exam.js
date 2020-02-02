const typeorm = require('typeorm')
const Exam = require('../datamodel/exam')


const ExamRepository = () => {

    const connection = typeorm.getConnection('iptm-ses-db')
    return connection.getRepository(Exam.Model)

}

const getExams = () => ExamRepository().find()

const createExam = ({ id, title }) => ExamRepository().save(new Exam.Model(id, title))

module.exports = { getExams, createExam }
