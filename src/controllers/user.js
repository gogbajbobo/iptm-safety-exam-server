const
    ADMIN = { username: 'admin', roles: ['admin'], id: 0 },
    USER = { username: 'user', roles: ['user'], id: 1 }

const authUser = ({ username, password }) => {

    if (username === 'admin') return ADMIN
    if (username === 'user') return USER
    return null

}

const findById = id => id === 0 ? ADMIN : USER


module.exports = { authUser, findById }
