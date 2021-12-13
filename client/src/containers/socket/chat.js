import { socket } from './index'
import { store } from '../../redux/store'
import { actions } from '../../redux/chat/actions'

const getCurrentConversation = () => store.getState().chat.conversation

export const chatEvents = {
    emitSendMessage: message => {
        socket.emit('new-message', { message })
    },
    onReceivedMessage: () => {
        socket.on('new-message', ({ message, conversation, emittingSocketId }) => {
            const { user } = store.getState().auth
            const userId = user?._id
            const shouldUpdateMessages = emittingSocketId !== socket.id
            conversation = {
                ...conversation,
                members: conversation.members.filter(member => member._id !== userId)
            }
            store.dispatch(
                actions.doReceiveMessage(conversation, message, shouldUpdateMessages, userId)
            )
        })
    },
    emitCreateGroup: roomId => {
        socket.emit('create-group', { roomId })
    },
    onCreatedGroup: () => {
        socket.on('created-group', ({ newConversation }) => {
            const { user } = store.getState().auth
            const userId = user?._id
            newConversation = {
                ...newConversation,
                members: newConversation.members.filter(member => member._id !== userId)
            }
            store.dispatch(actions.doReceiveConversation(newConversation, userId))
        })
    },
    emitSeeConversation: roomId => {
        socket.emit('see-conversation', { roomId })
    },
    onSawConversation: () => {
        socket.on('saw-conversation', ({ viewersQty, viewers }) => {
            const { user } = store.getState().auth
            const userId = user?._id
            store.dispatch(actions.doUpdateConversationViewers(viewers, viewersQty, userId))
        })
    }
}