const onConnect = require('./connect')
const onDisconnect = require('./disconnect')
const chatEvents = require('./chat')
const contactEvents = require('./contact')

const configureSocket = (io) => {
    io.on('connection', async socket => {
        const userId = socket.request.session.passport.user.toString()

        onConnect(io, socket, userId)

        const allEvents = {
            ...chatEvents,
            ...contactEvents
        }

        Object.values(allEvents).map(value => {
            if(typeof value === 'function') {
                value(io, socket, userId)
            }
        })

        socket.on('disconnect', async () => onDisconnect(io, socket, userId))
    })
}

module.exports = configureSocket