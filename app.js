const server = require('./src/server')
const db = require('./src/database')

server.startServer()
db.connectDatabase()
