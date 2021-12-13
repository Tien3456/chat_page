import { constants } from './constants'

const initialState = {
    isOpen: false,
    child: null
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.OPEN_MODAL:
            return {
                isOpen: true,
                child: action.payload
            }
        case constants.CLOSE_MODAL:
            return {
                isOpen: false,
                child: null
            }
        default:
            return state
    }
}