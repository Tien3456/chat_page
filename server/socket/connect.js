const User = require('../models/User')
const { Types } = require('mongoose')

module.exports = async (io, socket, userId) => {
    
    socket.leave(socket.id)
    socket.join(userId)

    const allRooms = io.sockets.adapter.rooms
    const numOfClients = allRooms.get(userId)?.size || 0

    if(numOfClients <= 1) {
        await User.updateOne(
            { _id: Types.ObjectId(userId) },
            { $set: { isOnline: true } }
        )
    }
}