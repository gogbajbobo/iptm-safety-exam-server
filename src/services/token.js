const
    jwt = require('jsonwebtoken'),
    { tokenCache } = require('./cache')


const secretKey = 'Super secret key'

function invokeToken(user) {

    const accessToken = jwt.sign(user, secretKey)
    tokenCache.set(accessToken, user)

    return { accessToken }

}

function extractData(token) {
    return jwt.decode(token, secretKey)
}


module.exports = {
    invokeToken,
    extractData,
}
