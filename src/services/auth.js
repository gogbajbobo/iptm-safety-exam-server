const authUser = ({ username, password }) => {

    if (username === 'user') return { username, role: 'user' }
    if (username === 'admin') return { username, role: 'admin' }

    return false

}

module.exports = { authUser }
