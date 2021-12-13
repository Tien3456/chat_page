import { put, call, delay, takeLatest } from 'redux-saga/effects'
import { constants } from './constants'
import { api } from '../../api/index'
import { contactEvents } from '../../containers/socket/contact'

function* fetchGetNewReceivedRequestsQty(action) {
    const {
        newReceivedFriendReqsQty
    } = yield call(api.get, '/friends/new-requests-qty')
    yield put({
        type: constants.SET_NEW_RECEIVED_REQUESTS_QTY,
        payload: newReceivedFriendReqsQty
    })
}

function* fetchGetFriendsList(action) {
    yield put({ type: constants.GET_FRIENDS_LIST_START })
    const { offset, limit } = action
    const payload = yield call(api.get, `/friends/list?offset=${offset}&limit=${limit}`)
    yield put({
        type: constants.GET_FRIENDS_LIST_SUCCESS,
        payload
    })
}

function* fetchGetFriendRequestsList(action) {
    yield put({ type: constants.GET_FRIEND_REQUESTS_LIST_START })
    const { offset, limit } = action
    const payload = yield call(api.get, `/friends/requests-list?offset=${offset}&limit=${limit}`)
    yield put({
        type: constants.GET_FRIEND_REQUESTS_LIST_SUCCESS,
        payload
    })
}

function* fetchAddFriend(action) {
    yield put({
        type: constants.ADD_FRIEND_START,
        contactId: action.contactId
    })
    const { isAdded } = yield call(api.get, `/friends/${action.contactId}/add`)
    if(isAdded) {
        contactEvents.emitAddFriend(action.contactId)
    }
    yield delay(3000)
    yield put({
        type: constants.ADD_FRIEND_SUCCESS,
        payload: action.contactId
    })
}

function* fetchCancelAddingFriend(action) {
    yield put({
        type: constants.CANCEL_ADDING_FRIEND_START,
        contactId: action.contactId
    })
    yield call(api.get, `/friends/${action.contactId}/cancel-adding`)
    yield delay(3000)
    yield put({
        type: constants.CANCEL_ADDING_FRIEND_SUCCESS,
        payload: action.contactId
    })
}

function* fetchAcceptFriendRequest(action) {
    yield put({
        type: constants.ACCEPT_FRIEND_REQUEST_START,
        contactId: action.contactId
    })
    const { isAccepted } = yield call(api.get, `/friends/${action.contactId}/accept`)
    if(isAccepted) {
        contactEvents.emitAcceptFriendReq(action.contactId)
    }
    yield delay(3000)
    yield put({
        type: constants.ACCEPT_FRIEND_REQUEST_SUCCESS,
        payload: action.contactId
    })
}

function* fetchRemoveFriend(action) {
    yield put({
        type: constants.REMOVE_FRIEND_START,
        contactId: action.contactId
    })
    yield call(api.get, `/friends/${action.contactId}/remove`)
    yield delay(3000)
    yield put({
        type: constants.REMOVE_FRIEND_SUCCESS,
        payload: action.contactId
    })
}

function* watchFetchFriends() {
    yield takeLatest(constants.GET_NEW_RECEIVED_REQUESTS_QTY, fetchGetNewReceivedRequestsQty)
    yield takeLatest(constants.GET_FRIENDS_LIST, fetchGetFriendsList)
    yield takeLatest(constants.GET_FRIEND_REQUESTS_LIST, fetchGetFriendRequestsList)
    yield takeLatest(constants.ADD_FRIEND, fetchAddFriend)
    yield takeLatest(constants.CANCEL_ADDING_FRIEND, fetchCancelAddingFriend)
    yield takeLatest(constants.ACCEPT_FRIEND_REQUEST, fetchAcceptFriendRequest)
    yield takeLatest(constants.REMOVE_FRIEND, fetchRemoveFriend)
}

export default watchFetchFriends