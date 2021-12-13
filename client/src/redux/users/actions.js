import { constants } from './constants'

export const actions = {
    doSearchUsers: (
        username,
        offset,
        limit,
        onlyOtherUsers,
        target
    ) => {
        return {
            type: constants.SEARCH_USERS,
            username,
            offset,
            limit,
            onlyOtherUsers,
            target
        }
    },
    doGetUserInfo: (_id) => {
        return {
            type: constants.GET_USER_INFO,
            _id
        }
    },
    doUploadAvatar: (_id, formData) => {
        return {
            type: constants.UPLOAD_AVATAR,
            _id,
            formData
        }
    },
    doSetIsFriend: isFriend => {
        return {
            type: constants.SET_IS_FRIEND,
            payload: isFriend
        }
    },
    doSetIsSendingFriendReq: isSendingFriendReq => {
        return {
            type: constants.SET_IS_SENDING_FRIEND_REQUEST,
            payload: isSendingFriendReq
        }
    },
    doSetIsSentFriendReq: isSentFriendReq => {
        return {
            type: constants.SET_IS_SENT_FRIEND_REQUEST,
            payload: isSentFriendReq
        }
    },
    doResetCurrentUser: () => {
        return { type: constants.RESET_CURRENT_USER }
    }, 
    doResetSearchedUsers: () => {
        return { type: constants.RESET_SEARCHED_USERS }
    }
}