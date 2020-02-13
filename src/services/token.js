const
    jwt = require('jsonwebtoken'),
    { tokenCache } = require('./cache')


const secretKey = 'Super secret key'
const tokenLifetime = 60 * 60 * 24 * 2 // seconds

const invokeToken = user => {

    const now = Date.now()
    const expirationTime = Math.floor(now / 1000) + tokenLifetime

    const data = { ...user, expirationTime }
    const accessToken = jwt.sign(data, secretKey)
    tokenCache.set(accessToken, data)

    return {
        accessToken,
        issued: now,
        expires: new Date(expirationTime * 1000)
    }

}

const extractData = token => jwt.decode(token, secretKey)


module.exports = {
    invokeToken,
    extractData,
}
