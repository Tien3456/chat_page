import { constants } from './constants'
import { api } from '../../api/index'
import { call, put, delay, takeLatest } from 'redux-saga/effects'

function* fetchSignIn(action) {
    yield put({ type: constants.AUTH_START })
    yield delay(2000)
    const { isAuthenticated, authMessages, user } = yield call(api.post, '/auth/signin', action.userInfo)
    if(isAuthenticated) {
        yield put({ 
            type: constants.AUTH_SUCCESS,
            payload: user
        })
        return
    }
    yield put({
        type: constants.AUTH_FAILED,
        payload: authMessages
    })
}

function* fetchSignUp(action) {
    yield put({ type: constants.AUTH_START })
    const { email, authMessages } = yield call(api.post, '/auth/signup', action.userInfo)
    if(email) {
        action.history.push('/verifymail', { email: email })
        yield put({
            type: constants.AUTH_FAILED,
            payload: []
        })
        return
    }
    yield put({
        type: constants.AUTH_FAILED,
        payload: authMessages
    })
}

function* fetchVerifyMail(action) {
    yield put({ type: constants.AUTH_START })
    yield delay(2000)
    const { 
        isAuthenticated, 
        authMessages, 
        user
    } = yield call(api.post, '/auth/verifymail', action.code)
    if(isAuthenticated) {
        yield put({ 
            type: constants.AUTH_SUCCESS,
            payload: user
        })
        return
    }
    yield put({
        type: constants.AUTH_FAILED,
        payload: authMessages
    })
}

function* fetchCheckAuth(action) {
    yield put({ type: constants.AUTH_START })
    const { isAuthenticated, user } = yield call(api.get, '/auth')
    if(isAuthenticated) {
        yield put({ 
            type: constants.AUTH_SUCCESS,
            payload: user
        })
        return
    }
    yield put({
        type: constants.AUTH_FAILED,
        payload: []
    })
}

function* fetchLogOut(action) {
    yield put({ type: constants.AUTH_START })
    yield call(api.get, '/auth/logout')
    yield put({
        type: constants.AUTH_FAILED,
        payload: []
    })
}

function* watchFetchAuth() {
    yield takeLatest(constants.CHECK_AUTH, fetchCheckAuth)
    yield takeLatest(constants.SIGN_IN, fetchSignIn)
    yield takeLatest(constants.SIGN_UP, fetchSignUp)
    yield takeLatest(constants.VERIFY_MAIL, fetchVerifyMail)
    yield takeLatest(constants.LOG_OUT, fetchLogOut)
}

export default watchFetchAuth