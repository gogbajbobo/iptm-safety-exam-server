const
    UsersController = require('../controllers/user'),
    cookie = require('cookie'),
    tokenService = require('./token'),
    { log } = require('./logger')


const checkJWT = JWTObject => {
    return JWTObject ? { username: 'username', roles: ['role'] } : null
}

const checkCredentials = ({ username, password }) => {

    const user = UsersController.authUser({ username, password })
    if (!user)
        return null

    const accessToken = tokenService.invokeToken(user)
    return { ...user, ...accessToken }

}

const authSocket = socket => {

    const { handshake } = socket

    const { headers, query } = handshake
    const cookieObject = cookie.parse(headers.cookie)
    log.info('cookieObject', cookieObject)
    const { authJWT } = cookieObject

    socket.user = authJWT ? checkJWT(authJWT) : checkCredentials(query)

    return socket

}

module.exports = { authSocket }
