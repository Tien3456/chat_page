const router = require('express').Router()
const { signIn, signUp, verifyMail, logOut } = require('../controllers/auth')
const { validate } = require('../share/validator')

router.get('/', (req, res) => {
    if(req.user) {
        const { _id, username, avatarSrc, gender } = req.user
        return res.status(200).json({
            isAuthenticated: true,
            user: {
                _id,
                username,
                avatarSrc,
                gender
            }
        })
    }
    res.status(200).json({
        isAuthenticated: false
    })
})

router.post(
    '/signin',
    validate.email(),
    validate.password(),
    signIn
)
router.post(
    '/signup',
    validate.email(),
    validate.username(),
    validate.password(),
    signUp
)
router.post('/verifymail', verifyMail)
router.get('/logout', logOut)

module.exports = router