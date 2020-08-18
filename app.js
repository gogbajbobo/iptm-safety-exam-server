const db = require('./src/database')
const server = require('./src/server')
const { log } = require('./src/services/logger')
require('reflect-metadata')


db.connectDatabase()
    .then(server.startServer)
    .catch(log.error)
