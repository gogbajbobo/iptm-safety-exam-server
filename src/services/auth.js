const
    UsersController = require('../controllers/user'),
    cookie = require('cookie'),
    tokenService = require('./token'),
    { log } = require('./logger')


const checkJWT = JWTObject => {

    const tokenData = tokenService.extractData(JWTObject)
    return JWTObject ? { ...tokenData } : null

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

    if (!headers.cookie)
        return socket

    const cookieObject = cookie.parse(headers.cookie)
    const { authJWT } = cookieObject

    socket.user = authJWT ? checkJWT(authJWT) : checkCredentials(query)

    return socket

}

module.exports = { authSocket }
