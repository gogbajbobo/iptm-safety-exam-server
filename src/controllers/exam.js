const typeorm = require('typeorm')
const Exam = require('../datamodel/exam')


const testExam = () => {

    const connection = typeorm.getConnection('iptm-ses-db')
    const examRepository = connection.getRepository(Exam.Model)

    const exam = new Exam.Model()
    exam.title = 'Test Exam 1'

    examRepository.save(exam)
        .then(savedExam => {

            console.log('Exam has been saved: ', savedExam)
            console.log('Now lets load all exams: ')

            return examRepository.find()

        })
        .then(allExams => console.log('All exams: ', allExams))

}

module.exports = { testExam }
