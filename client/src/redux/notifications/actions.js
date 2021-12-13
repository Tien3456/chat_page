import { constants } from './constants'

export const actions = {
    doGetNewNotificationsQty: () => {
        return { type: constants.GET_NEW_NOTIFICATIONS_QTY }
    },
    doSetNewNotificationsQty: payload => {
        return {
            type: constants.SET_NEW_NOTIFICATIONS_QTY,
            payload
        }
    },
    doGetNotificationsList: (offset, limit) => {
        return {
            type: constants.GET_NOTIFICATIONS_LIST,
            offset,
            limit
        }
    },
    doResetNotifications: () => ({ type: constants.RESET_NOTIFICATIONS })
}