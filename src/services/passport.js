const
    passport = require('passport'),
    passportLocal = require('passport-local'),
    passportCookie = require('passport-cookie'),
    UserController = require('../controllers/user'),
    { checkJWT } = require('./auth')


const LocalStrategy = passportLocal.Strategy
const CookieStrategy = passportCookie.Strategy

passport.use(new LocalStrategy((username, password, done) => {

    const user = UserController.authUser({ username, password })
    user ? done(null, user) : done(null, false, { message: 'auth fail' })

}))

passport.use(new CookieStrategy({ cookieName: 'authJWT' }, (token, done) => {

    const user = checkJWT(token)

    if (!user)
        return done(null, false)

    return done(null, user)

}))

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {

    UserController.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, false))

})


module.exports = passport
