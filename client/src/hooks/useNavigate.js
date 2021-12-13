import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme, useMediaQuery } from '@material-ui/core'
import { actions as modalActions } from '../redux/modal/actions'
import { actions as userActions } from '../redux/users/actions'
import { useHistory } from 'react-router-dom'

export const useNavigate = () => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const history = useHistory()
    const dispatch = useDispatch()

    const navigateToGroupCreator = () => {
        if(isXs) {
            const currentPath = window.location.href.replace(window.location.origin, "")
            history.push({
                pathname: '/group-creator',
                state: {
                    from: currentPath
                }
            })
            return
        }
        const childName = 'groupCreator'
        dispatch(modalActions.doOpenModal(childName))
    }

    const navigateToProfile = useCallback((_id) => {
        if(isXs) {
            const currentPath = window.location.href.replace(window.location.origin, "")
            history.push({
                pathname: `/profile/${_id}`,
                state: {
                    from: currentPath
                }
            })
            return
        }
        dispatch(userActions.doGetUserInfo(_id))
        dispatch(modalActions.doOpenModal('profile'))
    }, [isXs])

    const navigateToFriends = () => {
        if(isXs) {
            const currentPath = window.location.href.replace(window.location.origin, "")
            history.push({
                pathname: '/friends',
                state: {
                    from: currentPath
                }
            })
            return
        }
        dispatch(modalActions.doOpenModal('friends'))
    }

    const navigateToNotifications = () => {
        if(isXs) {
            history.push('/notifications')
            return
        }
        dispatch(modalActions.doOpenModal('notifications'))
    }

    const navigateToGroupMembers = roomId => {
        dispatch(modalActions.doOpenModal('groupMembers'))
    }

    return {
        navigateToGroupCreator,
        navigateToProfile,
        navigateToFriends,
        navigateToNotifications,
        navigateToGroupMembers
    }
}