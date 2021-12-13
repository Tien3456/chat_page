import { combineReducers } from "redux"
import { reducer as authReducer } from './auth/reducer'
import { reducer as usersReducer } from './users/reducer'
import { reducer as chatReducer } from './chat/reducer'
import { reducer as friendsReducer } from './friends/reducer'
import { reducer as notificationsReducer } from './notifications/reducer'
import { reducer as modalReducer } from './modal/reducer'
import { reducer as fileReducer } from './file/reducer'
import { reducer as apiReducer } from './api/reducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    chat: chatReducer,
    friends: friendsReducer,
    notifications: notificationsReducer,
    file: fileReducer,
    modal: modalReducer,
    api: apiReducer
})