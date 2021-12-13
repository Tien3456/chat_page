import { constants } from './constants'

export const actions = {
    doGetConversationsList: (offset, limit) => {
        return {
            type: constants.GET_CONVERSATIONS_LIST,
            offset,
            limit
        }
    },
    doGetConversation: (roomId, offset, limit) => {
        return {
            type: constants.GET_CONVERSATION,
            roomId,
            offset,
            limit
        }
    },
    doResetConversationsList: () => {
        return { type: constants.RESET_CONVERSATIONS_LIST }
    },
    doResetConversation: () => {
        return { type: constants.RESET_CONVERSATION }
    },
    doSendMessage: (roomId, formData) => {
        return {
            type: constants.SEND_A_MESSAGE,
            roomId,
            formData
        }
    },
    doReceiveMessage: (conversation, newMessage, shouldUpdateMessages, userId) => {
        return {
            type: constants.RECEIVE_A_MESSAGE,
            payload: {
                conversation,
                newMessage,
                shouldUpdateMessages,
                userId
            }
        }
    },
    doCreateGroup: (memberIds, history, groupName = null, isGroup = false) => {
        return { 
            type: constants.CREATE_GROUP,
            memberIds,
            groupName,
            isGroup,
            history
        }
    },
    doReceiveConversation: (newConversation, userId) => {
        return {
            type: constants.RECEIVE_CONVERSATION,
            payload: {
                newConversation,
                userId
            }
        }
    },
    doUpdateConversationViewers: (viewers, viewersQty, userId) => {
        return {
            type: constants.UPDATE_CONVERSATION_VIEWERS,
            payload: {
                viewers,
                viewersQty,
                userId
            }
        }
    },
    doResetNewMessagesQty: () => {
        return { type: constants.RESET_NEW_MESSAGES_QTY }
    },
    doAddSelectedUser: (user) => {
        return {
            type: constants.ADD_SELECTED_USER,
            user
        }
    },
    doRemoveSelectedUser: userId => {
        return {
            type: constants.REMOVE_SELECTED_USER,
            userId
        }
    },
    doResetSelectedUsers: () => {
        return { type: constants.RESET_SELECTED_USERS }
    },
    doGetMembers: (roomId, offset, limit) => {
        return {
            type: constants.GET_CHAT_MEMBERS_LIST,
            roomId,
            offset,
            limit
        }
    },
    doResetChatMembers: () => ({ type: constants.RESET_CHAT_MEMBERS })
}