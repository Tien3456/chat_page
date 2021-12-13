import { constants } from './constants'

const initialState = {
    status: null
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.SET_API_STATUS:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}