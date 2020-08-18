const
    { Router } = require('express'),
    passport = require('../services/passport'),
    token = require('../services/token')


const router = Router()

const clientDomain = 'http://localhost:8082'
const allowedOrigins = [clientDomain]
const authPath = `/auth`
const loginPath = `${ authPath }/login`
const logoutPath = `${ authPath }/logout`

router.route('*')
    .all((req, res, next) => {

        if (req.path === '/') {
            res.header('Access-Control-Allow-Origin', '*')
        } else {

            const reqOrigin = req.headers['origin']
            if (!allowedOrigins.includes(reqOrigin)) return res.status(403).end()
            res.header('Access-Control-Allow-Origin', reqOrigin)
            req.path.startsWith(authPath) && res.header('Access-Control-Allow-Credentials', true)

        }

        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Content-type, Authorization')
        req.method === 'OPTIONS' ? res.status(200).end() : next()

    })

router.route('/')
    .get((req, res) => res.json({ error: false, message: 'SES server ok' }))

router.route(loginPath)
    .post(passport.authenticate('local'), (req, res) => {

        const { user } = req
        const { accessToken, expires } = token.invokeToken(user)

        res
            .cookie('authJWT', accessToken, { expires, httpOnly: true, sameSite: true })
            .json({ user })

    })

router.route(logoutPath)
    .post(passport.authenticate('cookie', { session: false }), (req, res) => res.clearCookie('authJWT').end())


module.exports = router
