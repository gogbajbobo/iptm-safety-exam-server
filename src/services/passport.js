const
    passport = require('passport'),
    passportLocal = require('passport-local'),
    UserController = require('../controllers/user')


const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy((username, password, done) => {

    const user = UserController.authUser({ username, password })
    user ? done(null, user) : done(null, false, { message: 'auth fail' })

}))

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {

    UserController.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, false))

})


module.exports = passport
