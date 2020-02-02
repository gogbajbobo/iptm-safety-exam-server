const db = require('./src/database')
const server = require('./src/server')

server.startServer()
db.connectDatabase()
