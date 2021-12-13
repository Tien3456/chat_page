import { constants } from './constants'
import { api } from '../../api/index'
import { call, put, delay, takeLatest } from 'redux-saga/effects'

function* fetchGetUsers(action) {
    const { username, offset, limit, onlyOtherUsers, target } = action

    if(username.trim() === '' && target !== 'createGroup') {
        yield put({ type: constants.RESET_SEARCHED_USERS })
        return
    }
    
    yield put({ type: constants.SEARCH_USERS_START })

    const {
        users,
        usersQty
    } = yield call(api.get, `/users/search?username=${action.username}&offset=${offset}&limit=${limit}&onlyOtherUsers=${onlyOtherUsers}`)

    yield put({ 
        type: constants.SEARCH_USERS_SUCCESS,
        payload: {
            users,
            usersQty
        }
    })
}

function* fetchGetUser(action) {
    yield put({ type: constants.GET_USER_INFO_START })
    const { user } = yield call(api.get, `/users/${action._id}`)
    yield put({
        type: constants.GET_USER_INFO_SUCCESS,
        payload: user
    })
}

function* fetchUploadAvatar(action) {
    yield put({ type: constants.UPLOAD_AVATAR_START })
    const { avatarSrc } = yield call(api.post, `/users/${action._id}/upload-avatar`, action.formData)
    yield put({
        type: constants.UPLOAD_AVATAR_SUCCESS,
        payload: avatarSrc
    })
}

function* watchFetchUsers() {
    yield takeLatest(constants.SEARCH_USERS, fetchGetUsers)
    yield takeLatest(constants.GET_USER_INFO, fetchGetUser)
    yield takeLatest(constants.UPLOAD_AVATAR, fetchUploadAvatar)
}

export default watchFetchUsers