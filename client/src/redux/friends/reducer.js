import { constants } from './constants'
import produce from 'immer'

const initialState = {
    friends: {
        isLoading: false,
        list: [],
        qty: 0
    },
    friendRequests: {
        isLoading: false,
        list: [],
        qty: 0
    },
    contactHandling: {
        addingRequests: [],
        cancelingRequests: [],
        acceptingRequests: [],
        removingRequests: []
        
    },
    newReceivedFriendReqsQty: 0
}

export const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case constants.GET_FRIENDS_LIST_START:
                draft.friends.isLoading = true
                break
            case constants.GET_FRIENDS_LIST_SUCCESS:
                draft.friends.isLoading = false
                if(draft.friends.list.length === 0) {
                    draft.friends.qty = action.payload.friendsQty
                }
                draft.friends.list.push(...action.payload.friends)
                break
            case constants.GET_FRIEND_REQUESTS_LIST_START:
                draft.friendRequests.isLoading = true
                break
            case constants.GET_FRIEND_REQUESTS_LIST_SUCCESS:
                draft.friendRequests.isLoading = false
                if(draft.friendRequests.list.length === 0) {
                    draft.friendRequests.qty = action.payload.friendRequestsQty
                }
                draft.friendRequests.list.push(...action.payload.friendRequests)
                break
            case constants.ADD_FRIEND_START:
                draft.contactHandling.addingRequests.push(action.contactId)
                break
            case constants.CANCEL_ADDING_FRIEND_START:
                draft.contactHandling.cancelingRequests.push(action.contactId)
                break
            case constants.ACCEPT_FRIEND_REQUEST_START:
                draft.contactHandling.acceptingRequests.push(action.contactId)
                break
            case constants.REMOVE_FRIEND_START:
                draft.contactHandling.removingRequests.push(action.contactId)
                break
            case constants.ADD_FRIEND_SUCCESS: {
                const contactId = action.payload
                const matchedIdIndex = draft.contactHandling.addingRequests.indexOf(contactId)
                if(matchedIdIndex !== -1) {
                    draft.contactHandling.addingRequests.splice(matchedIdIndex, 1)
                }
                break
            }
            case constants.CANCEL_ADDING_FRIEND_SUCCESS: { 
                const contactId = action.payload
                const matchedIdIndex = draft.contactHandling.cancelingRequests.indexOf(contactId)
                if(matchedIdIndex !== -1) {
                    draft.contactHandling.cancelingRequests.splice(matchedIdIndex, 1)
                }
                break
            }
            case constants.ACCEPT_FRIEND_REQUEST_SUCCESS: {
                const contactId = action.payload
                const matchedIdIndex = draft.contactHandling.acceptingRequests.indexOf(contactId)
                if(matchedIdIndex !== -1) {
                    draft.contactHandling.acceptingRequests.splice(matchedIdIndex, 1)
                    const index = draft.friendRequests.list.find(request => request._id === contactId)
                    if(index !== -1) {
                        draft.friendRequests.list.splice(index, 1)
                    }
                }
                break
            }
            case constants.REMOVE_FRIEND_SUCCESS: {
                const contactId = action.payload
                const matchedIdIndex = draft.contactHandling.removingRequests.indexOf(contactId)
                if(matchedIdIndex !== -1) {
                    draft.contactHandling.removingRequests.splice(matchedIdIndex, 1)
                }
                break
            }
            case constants.SET_NEW_RECEIVED_REQUESTS_QTY:
                draft.newReceivedFriendReqsQty = action.payload
                break
            case constants.RESET_FRIENDS_LIST:
                draft.friends = initialState.friends
                break
            case constants.RESET_FRIEND_REQUESTS_LIST:
                draft.friendRequests = initialState.friendRequests
                break
            default:
                break
        }
    })
}