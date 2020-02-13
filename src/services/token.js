const
    jwt = require('jsonwebtoken'),
    { tokenCache } = require('./cache')


const secretKey = 'Super secret key'

const invokeToken = user => {

    const accessToken = jwt.sign(user, secretKey)
    tokenCache.set(accessToken, user)

    return { accessToken }

}

}

const extractData = token => jwt.decode(token, secretKey)


module.exports = {
    invokeToken,
    extractData,
}
