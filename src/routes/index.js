const
    { Router } = require('express'),
    passport = require('../services/passport'),
    token = require('../services/token')


const router = Router()

const allowedOrigins = ['http://localhost:8082']

router.route('*')
    .all((req, res, next) => {

        if (req.path === '/') {

            res.header('Access-Control-Allow-Origin', '*')

        } else {

            const reqOrigin = req.headers['origin']
            if (!allowedOrigins.includes(reqOrigin)) return res.status(403).end()

            res.header('Access-Control-Allow-Origin', reqOrigin)

        }

        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Content-type, Authorization')
        req.method === 'OPTIONS' ? res.status(200).end() : next()

    })

router.route('/')
    .get((req, res) => res.json({ error: false, message: 'SES server ok' }))

router.route(`/auth/login`)
    .post(passport.authenticate('local'), (req, res) => {
        res.json(token.invokeToken(req.user))
    })


module.exports = router
