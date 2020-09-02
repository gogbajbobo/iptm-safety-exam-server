const userRoles = require('../datamodel/_user_roles')

const
    ADMIN = { username: 'admin', roles: [ userRoles.admin ], id: 0 },
    EXAMINEE = { username: 'user', roles: [ userRoles.examinee ], id: 1 }

const authUser = ({ username, password }) => {

    if (username === 'admin') return ADMIN
    if (username === 'user') return EXAMINEE
    return null

}

const findById = id => id === 0 ? ADMIN : EXAMINEE


module.exports = { authUser, findById }
