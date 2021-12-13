const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = passport => {
    passport.use(
        'local.signin',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pass',
            passReqToCallback: true
        }, async (req, email, pass, done) => {
            const currentUser = await User.findOne({ email: email })
            if(currentUser) {
                const isMatched = await bcrypt.compare(pass, currentUser.pass)
                if(isMatched) {
                    done(null, currentUser)
                    return
                }
                req.session.authMessages = [{ param: 'pass', msg: 'Password was wrong' }]
                done(null, false)
                return
            }
            req.session.authMessages = [{ param: 'email', msg: "This email hasn't been signed up" }]
            done(null, false)
        })
    )
    
    passport.use(
        'local.register',
        new LocalStrategy({
            usernameField: 'code',
            passwordField: 'code',
            passReqToCallback: true
        }, async (req, code, password, done) => {
            if(parseInt(code) === req.session.code) {
                console.log(code)
                console.log(req.session.code)
                const { pass } = req.session.signedUser
                const hashedPass = await bcrypt.hash(pass, 10)
                const signedUser = {
                    ...req.session.signedUser,
                    pass: hashedPass
                }
                const newUser = new User(signedUser)
                const { _id } = await newUser.save()
                done(null, { _id, ...signedUser })
                return
            }
            req.session.authMessages = [{ param: 'code', msg: 'Code was wrong' }]
            done(null, false)
        })
    )

    passport.serializeUser((user, done) => {
        console.log('Serialize user: ', user._id)
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const currentUser = await User.findById(id)
        console.log('Deserialize: ', currentUser)
        currentUser
            ? done(null, currentUser)
            : done(null, false)
    })
}