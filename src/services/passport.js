const
    passport = require('passport'),
    passportLocal = require('passport-local'),
    UserController = require('../controllers/user')


const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy((username, password, done) => {

    const user = UserController.authUser({ username, password })
    user ? done(null, user) : done(null, false, { message: 'auth fail' })

}))


module.exports = passport
