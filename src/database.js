const typeorm = require('typeorm')
const Exam = require('./datamodel/exam')
const { log } = require('./services/logger')
const { isProduction } = require('./services/helper')

const connectionOptions = {
    name: 'iptm-ses-db',
    type: 'mysql',
    host: 'localhost',
    port: 3316,
    username: 'root',
    database: 'iptm_ses',
    synchronize: !isProduction,
    entities: [ Exam.Schema ],
}

const connectDatabase = () => {

    return typeorm.createConnection(connectionOptions)
        .then(connection => {

            log.info(`database connected at ${ new Date() }: ${ connection.name }`)
            return connection

        })
        .catch(error => log.error('database connection error:', error))

}

module.exports = { connectDatabase }
