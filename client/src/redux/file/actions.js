import { constants } from './constants'

export const actions = {
    doSetFileSrc: (fileType, src) => {
        return {
            type: constants.SET_FILE_SRC,
            fileType,
            src
        }
    },
    doResetFileSrc: () => {
        return { type: constants.RESET_FILE_SRC }
    }
}