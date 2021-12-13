import { constants } from './constants'
import produce from 'immer'

const initialState = {
    isLoading: false,
    newNotificationsQty: 0,
    qty: 0,
    list: []
}

export const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case constants.SET_NEW_NOTIFICATIONS_QTY:
                draft.newNotificationsQty = action.payload
                break
            case constants.GET_NOTIFICATIONS_LIST_START:
                draft.isLoading = true
                break
            case constants.GET_NOTIFICATIONS_LIST_SUCCESS:
                draft.isLoading = false
                if(draft.list.length === 0) {
                    draft.qty = action.payload.notificationsQty
                }
                draft.list.push(...action.payload.notifications)
                break
            case constants.RESET_NOTIFICATIONS:
                draft.qty = 0
                draft.list = []
                break
            default:
                break
        }
    })
}