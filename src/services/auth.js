const
    UsersController = require('../controllers/user'),
    cookie = require('cookie'),
    tokenService = require('./token')


const checkJWT = JWTObject => {
    return JWTObject ? { username: 'username', roles: ['role'] } : null
}

const checkCredentials = ({ username, password }) => {

    const user = UsersController.authUser({ username, password })
    return user
}

const authSocket = socket => {

    const { handshake } = socket

    const { headers, query } = handshake
    const cookieObject = cookie.parse(headers.cookie)
    console.log('cookieObject', cookieObject)
    const { authJWT } = cookieObject

    socket.user = authJWT ? checkJWT(authJWT) : checkCredentials(query)

    return socket

}

module.exports = { authSocket }
