import { constants } from './constants'
import { produce } from 'immer'

const initialState = {
    isLoading: false,
    isAuthenticated: null,
    user: null,
    authMessages: [],
    error: null
}

export const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case constants.AUTH_START:
                draft.isLoading = true
                break
            case constants.AUTH_SUCCESS:
                draft.isLoading = false
                draft.isAuthenticated = true
                draft.user = action.payload
                draft.authMessages = []
                break
            case constants.AUTH_FAILED:
                draft.isLoading = false
                draft.isAuthenticated = false
                draft.user = null
                draft.authMessages = action.payload
                break
            case constants.RESET_AUTH_MESSAGES:
                draft.authMessages = []
                break
            default:
                break
        }
    })
}