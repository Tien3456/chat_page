import axios from 'axios'
import { store } from '../redux/store'
import { actions as apiActions } from '../redux/api/actions'

export const api = {
    get: url => {
        return axios.get(url)
            .then(res => res.data)
            .catch(err => {
                if(err.response) {
                    store.dispatch(apiActions.doSetApiStatus(err.response.status))
                }
            })
    },
    post: (url, data) => {
        return axios.post(url, data)
            .then(res => res.data)
            .catch(err => {
                if(err.response) {
                    store.dispatch(apiActions.doSetApiStatus(err.response.status))
                }
            })
    }
}