import { constants } from './constants'

export const actions = {
    doSetApiStatus: (payload) => {
        return {
            type: constants.SET_API_STATUS,
            payload  // 404 401 500 ...
        }
    }
}