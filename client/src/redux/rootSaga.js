import watchFetchAuth from "./auth/saga"
import watchFetchUsers from './users/saga'
import watchFetchChat from './chat/saga'
import watchFetchFriends from "./friends/saga"
import watchFetchNotifications from "./notifications/saga"
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([
        watchFetchAuth(),
        watchFetchUsers(),
        watchFetchChat(),
        watchFetchFriends(),
        watchFetchNotifications()
    ])
}