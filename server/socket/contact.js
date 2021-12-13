const FriendRequest = require('../models/FriendRequest')
const Notification = require('../models/Notification')
const { Types } = require('mongoose')

const contactEvents = {
    onAddFriend: (io, socket, userId) => {
        socket.on('add-friend', async ({ contactId }) => {

            const {
                newReceivedFriendReqsQty
            } = await FriendRequest.getNewReceivedFriendReqsQty(Types.ObjectId(contactId))

            io.to(contactId).emit('received-friend-req', {
                newReceivedFriendReqsQty
            })
        })
    },
    onAcceptFriendRequest: (io, socket, userId) => {
        socket.on('accept-friend-req', async ({ contactId }) => {

            const {
                newNotificationsQty
            } = await Notification.getNewNotificationsQty(Types.ObjectId(contactId))
            io.to(contactId).emit('new-notification', {
                newNotificationsQty
            })
        })
    }
}

module.exports = contactEvents