import { constants } from './constants'

const initialState = {
    type: null,
    src: null
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.SET_FILE_SRC:
            return {
                type: action.fileType,
                src: action.src
            }
        case constants.RESET_FILE_SRC:
            return {...initialState}
        default:
            return state
    }
}