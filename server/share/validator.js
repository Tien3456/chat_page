const { body } = require('express-validator')

module.exports.validate = {
    email: () => {
        return body('email')
                .isEmail()
                .normalizeEmail()
                .withMessage('Invalid email')
    },
    username: () => {
        return body('username')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 chars long')
    },
    password: () => {
        return body('pass')
            .isLength({ min: 5 })
            .withMessage('Password must be at least 5 chars long')
            .isLength({ max: 15 })
            .withMessage('Password must be less than 15 chars long')
            .matches(/\d/)
            .withMessage('Password must contain a number')
    }
}