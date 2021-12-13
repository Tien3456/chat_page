import { socket } from './index'
import { store } from '../../redux/store'
import { actions as friendActions } from '../../redux/friends/actions'
import { actions as notificationActions } from '../../redux/notifications/actions'

export const contactEvents = {
    emitAddFriend: contactId => {
        socket.emit('add-friend', { contactId })
    },
    emitAcceptFriendReq: contactId => {
        socket.emit('accept-friend-req', { contactId })
    },
    onReceivedFriendReq: () => {
        socket.on('received-friend-req', ({ newReceivedFriendReqsQty }) => {

            store.dispatch(
                friendActions.doSetNewReceivedFriendReqsQty(newReceivedFriendReqsQty)
            )
        })
    },
    onAcceptedFriendReq: () => {
        socket.on('new-notification', ({ newNotificationsQty }) => {
            store.dispatch(
                notificationActions.doSetNewNotificationsQty(newNotificationsQty)
            )
        })
    }
}