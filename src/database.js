const typeorm = require('typeorm')
const Exam = require('./datamodel/exam')


const connectionOptions = {
    name: 'iptm-ses-db',
    type: 'mysql',
    host: 'localhost',
    port: 3316,
    username: 'root',
    database: 'iptm_ses',
    synchronize: true,
    entities: [ Exam.Schema ]
}

const testDB = () => {

    const connection = typeorm.getConnection('iptm-ses-db')
    const examRepository = connection.getRepository(Exam.Model)

    const exam1 = new Exam.Model()
    exam1.title = 'Test Exam 1'

    examRepository.save(exam1)
        .then(savedExam => {

            console.log('Exam has been saved: ', savedExam)
            console.log('Now lets load all exams: ')

            return examRepository.find()

        })
        .then(allExams => console.log('All exams: ', allExams))

}

const connectDatabase = () => {

    typeorm.createConnection(connectionOptions)
        .then(connection => {

            console.log(`database connected at ${ new Date() }: ${ connection.name }`)
            testDB()

        })
        .catch(error => {
            console.error('database connection error:', error)
        })

}

module.exports = { connectDatabase }
