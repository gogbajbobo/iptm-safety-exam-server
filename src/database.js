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

const connectDatabase = () => {

    return typeorm.createConnection(connectionOptions)
        .then(connection => {

            console.log(`database connected at ${ new Date() }: ${ connection.name }`)
            return connection

        })
        .catch(error => {
            console.error('database connection error:', error)
        })

}

module.exports = { connectDatabase }
