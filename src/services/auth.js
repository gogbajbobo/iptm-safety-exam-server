const UsersController = require('../controllers/user')

const checkJWT = JWTObject => {
    return JWTObject ? { username: 'username', roles: ['role'] } : null
}

const checkCredentials = ({ username, password }) => {

    const user = UsersController.authUser({ username, password })
    return user

}

module.exports = { checkJWT, checkCredentials }
