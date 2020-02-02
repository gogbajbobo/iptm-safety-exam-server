const db = require('./src/database')
const server = require('./src/server')
require('reflect-metadata')


db.connectDatabase()
    .then(server.startServer)
    .catch(console.error)
