const typeorm = require('typeorm')
const Exam = require('../datamodel/exam')


const ExamRepository = () => {

    const connection = typeorm.getConnection('iptm-ses-db')
    return connection.getRepository(Exam.Model)

}

const getExams = ack => {

    return ExamRepository().find()
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}

const createExam = (exam, ack) => {

    return ExamRepository().insert(exam)
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}

const deleteExam = (id, ack) => {

    return ExamRepository().delete(id)
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}

module.exports = { getExams, createExam, deleteExam }
