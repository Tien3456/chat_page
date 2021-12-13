const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 5000
const User = require('./models/User')
const Message = require('./models/Message')
const checkAuth = require('./middlewares/checkAuth')
const { ObjectId } = require('mongoose').Types

require('dotenv').config()
require('./config/database')()
require('./config/passport')(passport)
require('./config/cloudinary')()
console.log(process.env.NODE_ENV)

const sessionMiddleware = session({
    saveUninitialized: true,
    resave: true,
    secret: 'session',
    cookie: {
        secure: false
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next)
})
require('./socket/index')(io)


app.use('/users', checkAuth, require('./routes/user'))
app.use('/chat', checkAuth, require('./routes/chat'))
app.use('/friends', checkAuth, require('./routes/friend'))
app.use('/notifications', checkAuth, require('./routes/notifications'))
app.use('/auth', require('./routes/auth'))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    })
}

// let messages = []

// const getRandomInt = (min, max) => {
//     return Math.floor(Math.random() * (max - min) + min)
// }

// const memberIds = [
//     ObjectId('60fde22b12238c30c0741eb3'),
//     ObjectId('6111c6fe647f142738fad7ba'),
//     ObjectId('60f81ebec9d82910e00c0983')
// ]

// const initTime = Date.now() - 200000 * 60000 * 2

// let j = 0

// for(let i = 400000; i < 600000; i ++) {
//     const index = getRandomInt(0, 2)
//     const createdAt = initTime + j * 60000 * 2
//     j ++
//     messages.push({
//         roomId: ObjectId('61a5097701f892ff24f54de2'),
//         msgType: "normal",
//         senderId: memberIds[index],
//         text: `Test_${i}`,
//         files: [],
//         createdAt
//     })
// }

// console.log(messages)

// app.get('/update-chat', async (req, res) => {
//     const info = await Message.insertMany(messages)
//     console.log(info)
//     res.json({})
// }) 

server.listen(port, () => console.log(`Server started on port ${port}`))