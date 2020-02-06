const checkJWT = JWTObject => {
    return JWTObject ? { username: 'username', roles: ['role'] } : null
}

const checkCredentials = ({ username, password }) => {

    if (username === 'user') return { username, roles: ['user'] }
    if (username === 'admin') return { username, roles: ['admin'] }
    return null

}

module.exports = { checkJWT, checkCredentials }
