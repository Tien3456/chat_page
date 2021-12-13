const Conversation = require('../models/Conversation')
const { Types } = require('mongoose')

const chatEvents = {
    sendMessage: async (io, socket, userId) => {

        socket.on('new-message', async ({ message }) => {
            console.log('Message: ', message)

            const values = await Promise.all([
                Conversation.getMemberIds(message.roomId, Types.ObjectId(userId)),
                Conversation.getRoomInfo(message.roomId)
            ])

            const { memberIds } = values.find(value => value?.hasOwnProperty('memberIds'))
            const { conversation } = values.find(value => value?.hasOwnProperty('conversation'))

            if(memberIds.length > 0) {
                io.to(memberIds).emit('new-message', { 
                    message,
                    conversation,
                    emittingSocketId: socket.id
                })
            }
        })
    },
    createGroup: async (io, socket, userId) => {
        socket.on('create-group', async ({ roomId }) => {
            const values = await Promise.all([
                Conversation.getMemberIds(roomId, Types.ObjectId(userId)),
                Conversation.getRoomInfo(roomId)
            ])

            const { memberIds } = values.find(value => value?.hasOwnProperty('memberIds'))
            const { conversation } = values.find(value => value?.hasOwnProperty('conversation'))

            if(memberIds.length > 0) {
                io.to(memberIds).emit('created-group', {
                    newConversation: conversation
                })
            }
        })
    },
    seeConversation: async (io, socket, userId) => {
        socket.on('see-conversation', async ({ roomId }) => {
            const conversation = await Conversation.findOneAndUpdate(
                { roomId: Types.ObjectId(roomId) },
                { $set: { 'members.$[elem].latestSeenAt': Date.now() } },
                { arrayFilters: [{ 'elem._id': Types.ObjectId(userId) }] }
            )
            console.log(conversation)

            const { viewers, viewersQty } = await Conversation.getViewers(roomId)

            io.to(conversation.latestMessage.senderId.toString()).emit('saw-conversation', { 
                viewers,
                viewersQty
            })
        })
    }
}

module.exports = chatEvents