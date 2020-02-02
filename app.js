const db = require('./src/database')
const server = require('./src/server')

db.connectDatabase()
    .then(server.startServer)
    .catch(console.error)
