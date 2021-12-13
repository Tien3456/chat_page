import { constants } from './constants'

export const actions = {
    doCheckAuth: () => {
        return {
            type: constants.CHECK_AUTH
        }
    },
    doSignIn: userInfo => {
        return {
            type: constants.SIGN_IN,
            userInfo
        }
    },
    doSignUp: (userInfo, history) => {
        return {
            type: constants.SIGN_UP,
            userInfo,
            history
        }
    },
    doVerifyMail: code => {
        return {
            type: constants.VERIFY_MAIL,
            code
        }
    },
    doLogOut: () => {
        return { type: constants.LOG_OUT }
    },
    doResetAuthMessages: () => {
        return { type: constants.RESET_AUTH_MESSAGES }
    }
}