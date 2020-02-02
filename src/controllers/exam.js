const typeorm = require('typeorm')
const Exam = require('../datamodel/exam')


const testExam = () => {
    return saveExam({ title: 'Test Exam 1' })
}

const saveExam = ({ title }) => {

    const connection = typeorm.getConnection('iptm-ses-db')
    const examRepository = connection.getRepository(Exam.Model)

    const exam = new Exam.Model()
    exam.title = title

    examRepository.save(exam)
        .then(savedExam => {

            console.log('Exam has been saved: ', savedExam)
            console.log('Now lets load all exams: ')

            return examRepository.find()

        })
        .then(console.log)
        .catch(console.error)

}

module.exports = { testExam }
