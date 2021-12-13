import io from 'socket.io-client'
import { chatEvents } from './chat'
import { contactEvents } from './contact'

export const socket = io({
    autoConnect: false
})

export const socketEventsListener = () => {
    chatEvents.onReceivedMessage()
    chatEvents.onCreatedGroup()
    chatEvents.onSawConversation()
    contactEvents.onReceivedFriendReq()
    contactEvents.onAcceptedFriendReq()
}