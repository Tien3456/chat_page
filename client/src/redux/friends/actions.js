import { constants } from './constants'

export const actions = {
    doGetNewReceivedFriendReqsQty: () => {
        return { type: constants.GET_NEW_RECEIVED_REQUESTS_QTY }
    },
    doSetNewReceivedFriendReqsQty: payload => {
        return { 
            type: constants.SET_NEW_RECEIVED_REQUESTS_QTY,
            payload
        }
    },
    doGetFriendsList: (offset, limit) => {
        return { 
            type: constants.GET_FRIENDS_LIST,
            offset,
            limit
        }
    },
    doGetFriendRequestsList: (offset, limit) => {
        return { 
            type: constants.GET_FRIEND_REQUESTS_LIST,
            offset,
            limit
        }
    },
    doAddFriend: contactId => {
        return {
            type: constants.ADD_FRIEND,
            contactId
        }
    },
    doCancelAddingFriend: contactId => {
        return {
            type: constants.CANCEL_ADDING_FRIEND,
            contactId
        }
    },
    doAcceptFriendRequest: contactId => {
        return {
            type: constants.ACCEPT_FRIEND_REQUEST,
            contactId
        }
    },
    doRemoveFriend: contactId => {
        return {
            type: constants.REMOVE_FRIEND,
            contactId
        }
    },
    doResetFriendsList: () => {
        return { type: constants.RESET_FRIENDS_LIST }
    },
    doResetFriendRequestsList: () => {
        return { type: constants.RESET_FRIEND_REQUESTS_LIST }
    }
}