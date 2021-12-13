import { constants } from './constants'
import produce from 'immer'

const initialState = {
    conversations: {
        isLoading: false,
        list: [],
        qty: 0,
        newConversationsQty: 0
    },
    conversation: {
        isLoading: false,
        isSending: false,
        isGettingMembers: false,
        roomId: null,
        isGroup: false,
        groupName: null,
        membersQty: 0,
        members: [],
        messagesList: [],
        messagesQty: 0,
        viewers: [],
        viewersQty: 0
    },
    groupCreator: {
        isCreating: false,
        selectedUsers: []
    }
}

export const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case constants.GET_CONVERSATIONS_LIST_START:
                draft.conversations.isLoading = true
                break
            case constants.GET_CONVERSATIONS_LIST_SUCCESS: {
                const { 
                    conversations, 
                    conversationsQty,
                    newConversationsQty
                } = action.payload
                draft.conversations.isLoading = false
                draft.conversations.list.push(...conversations)
                if(conversationsQty) {
                    draft.conversations.qty = conversationsQty
                }
                if(newConversationsQty) {
                    draft.conversations.newConversationsQty = newConversationsQty
                }
                break
            }
            case constants.GET_CONVERSATION_START:
                draft.conversation.isLoading = true
                break
            case constants.GET_CONVERSATION_SUCCESS: {
                const {
                    isGroup,
                    roomId,
                    groupName,
                    messagesList,
                    messagesQty,
                    membersQty,
                    members,
                    viewers,
                    viewersQty
                } = action.payload
                
                draft.conversation.isLoading = false
                
                if(draft.conversation.messagesQty === 0) {
                    draft.conversation.isGroup = isGroup
                    draft.conversation.roomId = roomId
                    draft.conversation.groupName = groupName
                    draft.conversation.membersQty = membersQty
                    draft.conversation.members = members
                    draft.conversation.messagesQty = messagesQty
                    draft.conversation.viewers = viewers
                    draft.conversation.viewsQty = viewersQty
                }
                draft.conversation.messagesList.unshift(...messagesList)
                break
            }
            case constants.SEND_A_MESSAGE_START:
                draft.conversation.isSending = true
                break
            case constants.SEND_A_MESSAGE_SUCCESS: {
                const { newMessage } = action.payload
                draft.conversation.isSending = false
                draft.conversation.messagesQty ++
                draft.conversation.messagesList.push(newMessage)
                draft.conversation.viewers = []
                draft.conversation.viewersQty = 0
                break
            }
            case constants.RECEIVE_A_MESSAGE: {
                const { newMessage, conversation, shouldUpdateMessages, userId } = action.payload
                const currentRoomId = draft.conversation.roomId

                const matchedConversation = draft.conversations.list.find(c => {
                    return c.roomId === newMessage.roomId
                })

                if(matchedConversation) {
                    const conversationIndex = draft.conversations.list.indexOf(matchedConversation)
                    if(conversationIndex !== -1) {
                        draft.conversations.list[conversationIndex] = draft.conversations.list[0]
                        draft.conversations.list[0] = {
                            ...conversation,
                            newMessagesQty: newMessage.sender._id !== userId
                                ? matchedConversation.newMessagesQty + 1
                                : 0
                        }
                        draft.conversations.newConversationsQty = 
                            draft.conversations.list[0].newMessagesQty === 1 &&
                            newMessage.sender._id !== userId
                                ? draft.conversations.newConversationsQty + 1
                                : draft.conversations.newConversationsQty
                    }
                } else {
                    draft.conversations.qty ++
                    draft.conversations.list.unshift({
                        ...conversation,
                        newMessagesQty: newMessage.sender._id !== userId ? 1 : 0
                    })
                    draft.conversations.newConversationsQty = 
                        newMessage.sender._id !== userId
                             ? draft.conversations.newConversationsQty + 1
                             : draft.conversations.newConversationsQty
                }

                if(currentRoomId === newMessage.roomId && shouldUpdateMessages) {
                    draft.conversation.messagesList.push(newMessage)
                    draft.conversation.messagesQty ++
                }
                
                break
            }
            case constants.CREATE_GROUP_START:
                draft.groupCreator.isCreating = true
                break
            case constants.CREATE_GROUP_SUCCESS:
                draft.groupCreator.isCreating = false
                draft.groupCreator.selectedUsers = []
                break
            case constants.RECEIVE_CONVERSATION: {
                const { newConversation, userId } = action.payload
                draft.conversations.list.unshift({
                    ...newConversation,
                    newMessagesQty: newConversation.isGroup && newConversation.latestMessage.senderId !== userId
                        ? 1
                        : 0
                })
                draft.conversations.newConversationsQty = 
                    newConversation.isGroup && newConversation.latestMessage.senderId !== userId
                        ? draft.conversations.newConversationsQty + 1
                        : draft.conversations.newConversationsQty
                draft.conversations.qty ++
                break
            }
            case constants.UPDATE_CONVERSATION_VIEWERS:
                const { viewers, viewersQty, userId } = action.payload
                const latestMessage = draft.conversation.messagesList[draft.conversation.messagesList.length - 1]
                if(latestMessage?.sender._id === userId) {
                    draft.conversation.viewers = viewers
                    draft.conversation.viewersQty = viewersQty
                }
                break
            case constants.ADD_SELECTED_USER:
                draft.groupCreator.selectedUsers.push(action.user)
                break
            case constants.REMOVE_SELECTED_USER:
                const user = draft.groupCreator.selectedUsers.find(user => user._id === action.userId)
                const index = draft.groupCreator.selectedUsers.indexOf(user)
                if(index !== -1) {
                    draft.groupCreator.selectedUsers.splice(index, 1)
                }
                break
            case constants.GET_CHAT_MEMBERS_LIST_START:
                draft.conversation.isGettingMembers = true
                if(draft.conversation.members.length < 3) {
                    draft.conversation.members = []
                }
                break
            case constants.GET_CHAT_MEMBERS_LIST_SUCCESS:
                draft.conversation.isGettingMembers = false
                draft.conversation.members.push(...action.payload)
                break
            case constants.RESET_CHAT_MEMBERS:
                draft.conversation.isGettingMembers = false
                draft.conversation.members = []
                break
            case constants.RESET_SELECTED_USERS:
                draft.groupCreator = {...initialState.groupCreator}
                break
            case constants.RESET_NEW_MESSAGES_QTY: {
                const currentRoomId = draft.conversation.roomId
                const matchedConversation = draft.conversations.list.find(c => c.roomId === currentRoomId)
                if(matchedConversation && matchedConversation.newMessagesQty > 0) {
                    const index = draft.conversations.list.indexOf(matchedConversation)
                    if(index !== -1) {
                        draft.conversations.list[index].newMessagesQty = 0
                        draft.conversations.newConversationsQty --
                    }
                }
                break
            }
            case constants.RESET_CONVERSATIONS_LIST:
                draft.conversations = {...initialState.conversations}
                break
            case constants.RESET_CONVERSATION:
                draft.conversation = {...initialState.conversation}
                break
            default:
                break
        }
    })
}