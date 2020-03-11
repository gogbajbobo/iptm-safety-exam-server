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

const createExam = ({ id, title }, ack) => {

    return ExamRepository().save(new Exam.Model(id, title))
        .then(payload => ack({ payload }))
        .catch(error => ack({ error }))

}

module.exports = { getExams, createExam }
