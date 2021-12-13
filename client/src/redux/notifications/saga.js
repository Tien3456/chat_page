import { constants } from './constants'
import { put, call, takeLatest } from 'redux-saga/effects'
import { api } from '../../api/index'

function* fetchGetNewNoticationsQty(action) {
    const {
        newNotificationsQty
    } = yield call(api.get, '/notifications/new-qty')
    
    yield put({
        type: constants.SET_NEW_NOTIFICATIONS_QTY,
        payload: newNotificationsQty
    })
}

function* fetchGetNotificationsList(action) {
    yield put({ type: constants.GET_NOTIFICATIONS_LIST_START })
    const { offset, limit } = action

    const payload = yield call(api.get, `/notifications/list?offset=${offset}&limit=${limit}`)
    yield put({
        type: constants.GET_NOTIFICATIONS_LIST_SUCCESS,
        payload
    })
}

function* watchFetchNotifications() {
    yield takeLatest(constants.GET_NEW_NOTIFICATIONS_QTY, fetchGetNewNoticationsQty)
    yield takeLatest(constants.GET_NOTIFICATIONS_LIST, fetchGetNotificationsList)
}

export default watchFetchNotifications