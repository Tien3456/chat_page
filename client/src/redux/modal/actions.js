import { constants } from './constants'

export const actions = {
    doOpenModal: (child) => {
        return {
            type: constants.OPEN_MODAL,
            payload: child
        }
    },
    doCloseModal: () => {
        return {
            type: constants.CLOSE_MODAL
        }
    }
}