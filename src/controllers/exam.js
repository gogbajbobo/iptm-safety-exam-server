const typeorm = require('typeorm')
const Exam = require('../datamodel/exam')


const ExamRepository = () => typeorm.getRepository(Exam.Model, 'iptm-ses-db')

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

const updateExam = (exam, ack) => {

    return ExamRepository().update(exam.id, exam)
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}

const deleteExam = (id, ack) => {

    return ExamRepository().delete(id)
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}

module.exports = { getExams, createExam, updateExam, deleteExam }
