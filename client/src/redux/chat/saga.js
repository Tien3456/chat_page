import { constants } from './constants'
import { put, call, takeLatest } from 'redux-saga/effects'
import { api } from '../../api/index'
import { chatEvents } from '../../containers/socket/chat'

function* fetchGetConversationsList(action) {
    yield put({ type: constants.GET_CONVERSATIONS_LIST_START })
    const { offset, limit } = action
    const data = yield call(api.get, `/chat/list?offset=${offset}&limit=${limit}`)
    yield put({
        type: constants.GET_CONVERSATIONS_LIST_SUCCESS,
        payload: data
    })
}

function* fetchGetConversation(action) {
    const { offset, limit } = action

    yield put({ type: constants.GET_CONVERSATION_START })

    const data = yield call(api.get, `/chat/${action.roomId}?offset=${offset}&limit=${limit}`)

    yield put({
        type: constants.GET_CONVERSATION_SUCCESS,
        payload: data
    })
}

function* fetchSendMessage(action) {
    yield put({ type: constants.SEND_A_MESSAGE_START })
    const {
        newMessage
    } = yield call(api.post, `/chat/${action.roomId}/new-message`, action.formData)
    yield put({ 
        type: constants.SEND_A_MESSAGE_SUCCESS,
        payload: { newMessage }
    })
    chatEvents.emitSendMessage(newMessage)
}

function* fetchCreateGroup(action) {
    yield put({ type: constants.CREATE_GROUP_START })

    const { memberIds, groupName, isGroup, history } = action

    const { 
        isCreated,
        roomId 
    } = yield call(api.post, `/chat/create-group`, { 
       isGroup,
       groupName,
       memberIds
    })

    yield put({ type: constants.CREATE_GROUP_SUCCESS })

    if(roomId) {
        history.push(`/chat/${roomId}`)
        if(isCreated && isGroup) {
            chatEvents.emitCreateGroup(roomId)
        }
    }
}

function* fetchGetMembers(action) {
    yield put({ type: constants.GET_CHAT_MEMBERS_LIST_START })
    const { roomId, offset, limit } = action
    const { 
        members 
    } = yield call(api.get, `/chat/${roomId}/members?offset=${offset}&limit=${limit}`)
    yield put({
        type: constants.GET_CHAT_MEMBERS_LIST_SUCCESS,
        payload: members
    })
}

function* watchFetchChat() {
    yield takeLatest(constants.GET_CONVERSATIONS_LIST, fetchGetConversationsList)
    yield takeLatest(constants.GET_CONVERSATION, fetchGetConversation)
    yield takeLatest(constants.SEND_A_MESSAGE, fetchSendMessage)
    yield takeLatest(constants.CREATE_GROUP, fetchCreateGroup)
    yield takeLatest(constants.GET_CHAT_MEMBERS_LIST, fetchGetMembers)
}

export default watchFetchChat