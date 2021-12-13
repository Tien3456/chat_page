const User = require('../models/User')
const { Types } = require('mongoose')

module.exports = async (io, socket, userId) => {

    const allRooms = io.sockets.adapter.rooms

    const numOfClients = allRooms.get(userId)?.size || 0

    console.log("Num of clients: ", numOfClients)

    if(numOfClients === 0) {
        await User.updateOne(
            { _id: Types.ObjectId(userId) },
            {
                $set: {
                    isOnline: false,
                    latestOnline: Date.now()
                }
            }
        )
    }
}