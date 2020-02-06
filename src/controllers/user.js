const authUser = ({ username, password }) => {

    if (username === 'user') return { username, roles: ['user'] }
    if (username === 'admin') return { username, roles: ['admin'] }
    return null

}

module.exports = { authUser }
