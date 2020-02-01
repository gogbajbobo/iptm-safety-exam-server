const typeorm = require("typeorm")

const connectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3316,
    username: 'root',
    database: 'iptm_ses',
    synchronize: true,
}

const connectDatabase = () => {

    typeorm.createConnection(connectionOptions)
        .then(connection => {
            console.log(`database connected at ${ new Date() }: ${ connection.name }`)
        })
        .catch(error => {
            console.error('database connection error:', error)
        })

}

module.exports = { connectDatabase }
