const nodeMailer = require('nodemailer')

module.exports = nodeMailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})