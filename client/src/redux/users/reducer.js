import { constants } from './constants'
import produce from 'immer'

const initialState = {
    searchedUsers: {
        isLoading: false,
        list: [],
        qty: 0
    },
    currentUser: {
        isLoading: false,
        isUploading: false,
        info: {
            isContact: null,
            email: null,
            username: null,
            avatarSrc: null,
            gender: null,
            isFriend: null,
            isSentFriendReq: null,
            isSendingFriendReq: null
        }
    }
}

export const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case constants.SEARCH_USERS_START:
                draft.searchedUsers.isLoading = true
                break
            case constants.SEARCH_USERS_SUCCESS: {
                const { users, usersQty } = action.payload
                draft.searchedUsers.isLoading = false
                draft.searchedUsers.list.push(...users)
                if(usersQty) {
                    draft.searchedUsers.qty = usersQty
                }
                break
            }
            case constants.GET_USER_INFO_START:
                draft.currentUser.isLoading = true
                break
            case constants.GET_USER_INFO_SUCCESS:
                draft.currentUser.isLoading = false
                draft.currentUser.info = action.payload
                break
            case constants.UPLOAD_AVATAR_START:
                draft.currentUser.isUploading = true
                break
            case constants.UPLOAD_AVATAR_SUCCESS:
                draft.currentUser.isUploading = false
                draft.currentUser.info.avatarSrc = action.payload
                break
            case constants.SET_IS_FRIEND:
                if(typeof action.payload === 'boolean') {
                    draft.currentUser.info.isFriend = action.payload
                }
                break
            case constants.SET_IS_SENDING_FRIEND_REQUEST:
                if(typeof action.payload === 'boolean') {
                    draft.currentUser.info.isSendingFriendReq = action.payload
                }
                break
            case constants.SET_IS_SENT_FRIEND_REQUEST:
                if(typeof action.payload === 'boolean') {
                    draft.currentUser.info.isSentFriendReq = action.payload
                }
                break
            case constants.RESET_CURRENT_USER:
                draft.currentUser = {...initialState.currentUser}
                break
            case constants.RESET_SEARCHED_USERS:
                draft.searchedUsers = initialState.searchedUsers
                break
            default:
                break
        }
    })
}