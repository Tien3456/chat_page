const passport = require('passport')
const { validationResult } = require('express-validator')
const { validate } = require('../share/validator')
const transporter = require('../config/nodemailer')
const User = require('../models/User')

module.exports = {
    signIn: async (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            const authMessages = errors.array().map(err => {
                return {
                    param: err.param,
                    msg: err.msg
                }
            })
            return res.json({
                isAuthenticated: false,
                authMessages
            })
        }

        passport.authenticate('local.signin', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { 
                return res.json({
                    isAuthenticated: false,
                    authMessages: req.session.authMessages
                })
            }
            req.logIn(user, err => {
                if (err) { return next(err) }
                const { _id, username, avatarSrc, gender } = user
                return res.json({
                    isAuthenticated: true,
                    user: {
                        _id,
                        username,
                        avatarSrc,
                        gender
                    }
                })
            })
        })(req, res, next)
    },
    signUp: async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            const authMessages = errors.array().map(err => {
                return {
                    param: err.param,
                    msg: err.msg
                }
            })
            return res.json({
                isAuthenticated: false,
                authMessages
            })
        }
    
        const currentUser = await User.findOne({ email: req.body.email }, { _id: 1 })
    
        if(!currentUser) {
            const code = Math.floor(Math.random() * (9999 - 1000) + 1000)
            req.session.code = code
            req.session.signedUser = req.body
            console.log(code)
    
            const info = await transporter.sendMail({
                from: 'Abc',
                to: req.body.email,
                subject: 'Code',
                text: `Your code is ${code}`
            })
            console.log(info)
    
            return res.json({ isMember: false, email: req.body.email })
        }
        res.json({
            isMember: true,
            authMessages: [{ param: 'email', msg: 'This email has been signed' }]
        })
    },
    verifyMail: async (req, res, next) => {
        passport.authenticate('local.register', function(err, user, info) {
            if (err) { return next(err) }
            if (!user) {
                return res.json({
                    isAuthenticated: false,
                    authMessages: req.session.authMessages
                })
            }
            req.logIn(user, function(err) {
                if (err) { return next(err) }
                const { _id, username, avatarSrc, gender } = user
                return res.json({
                    isAuthenticated: true,
                    user: {
                        _id,
                        username,
                        avatarSrc,
                        gender
                    }
                })
            });
        })(req, res, next)
    },
    logOut: async (req, res) => {
        req.logout()
        console.log(req.user)
        res.status(200).json({ user: req.user })
    }
}