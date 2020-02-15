const
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    { createLogger, transports, format } = require('winston')

require('winston-daily-rotate-file')

const isProduction = process.env.NODE_ENV === 'production'

const logDirectory = path.join(__dirname, '../../logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const requestLoggers = [
    morgan('dev')
]

const consoleLogger = new transports.Console({
    level: 'silly',
    format: format.combine(
        format.colorize(),
        format.simple()
    )
})

const myFormat = format.printf(info => {
    return `${ info.timestamp } [${ info.level }]: ${ info.message }`;
});

const dailyRotateFileLogger = new transports.DailyRotateFile({
    timestamp: true,
    dirname: `${ logDirectory }`,
    filename: `IMT-SES-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
    format: format.combine(
        format.timestamp(),
        myFormat
    ),
    json: false
})

    ? [dailyRotateFileLogger, consoleLogger]
    : [dailyRotateFileLogger]
const loggerTransports = isProduction

const log = createLogger({
    level: 'silly',
    transports: loggerTransports
})


module.exports = { requestLoggers, log }
