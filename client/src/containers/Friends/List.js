import React, { useEffect, useCallback } from 'react'
import { Grid, List } from '@material-ui/core'
import Item from './Item'
import { useStyles } from './styles/List'
import { useSelector, useDispatch } from 'react-redux'
import { useAsync } from '../../hooks/useAsync'
import { useNavigate } from '../../hooks/useNavigate'
import { actions } from '../../redux/friends/actions'
import { api } from '../../api/index'

const ListContainer = ({ isNavigatedToFriendsList }) => {

    const dispatch = useDispatch()
    const classes = useStyles()

    const { 
        friends, 
        friendRequests,
        newReceivedFriendReqsQty,
        contactHandling
    } = useSelector(state => state.friends)

    const { acceptingRequests } = contactHandling

    const { navigateToProfile } = useNavigate()

    const acceptFriendRequest = useCallback((contactId) => {
        dispatch(actions.doAcceptFriendRequest(contactId))
    }, [])

    const updateNewReceivedFriendReqs = useAsync(() => {
        return api.get('/friends/update-new')
    }, false)

    useEffect(() => {
        return () => {
            dispatch(actions.doResetFriendsList())
            dispatch(actions.doResetFriendRequestsList())
        }
    }, [])

    useEffect(() => {
        if(!isNavigatedToFriendsList && newReceivedFriendReqsQty !== 0) {
            dispatch(actions.doSetNewReceivedFriendReqsQty(0))
            updateNewReceivedFriendReqs.execute()
        }
    }, [isNavigatedToFriendsList])

    return (
        <Grid container className={ classes.root }>
            <List className={ classes.list }>
                {
                    isNavigatedToFriendsList
                        ? <>
                        {
                            friends.list.map(friend => (
                                <Item 
                                    key={ `friend${friend._id}` }
                                    isNavigatedToFriendsList={ isNavigatedToFriendsList }
                                    {...friend}
                                    navigateToProfile={() => navigateToProfile(friend._id)}
                                />
                            ))
                        }
                        </>
                        : <>
                        {
                            friendRequests.list.map(request => (
                                <Item
                                    key={ `friend-request${request._id}` }
                                    isNavigatedToFriendsList={ isNavigatedToFriendsList }
                                    {...request}
                                    navigateToProfile={() => navigateToProfile(request._id)}
                                    acceptFriendRequest={() => acceptFriendRequest(request._id)}
                                    isAcceptingRequest={ acceptingRequests.indexOf(request._id) !== -1 }
                                />
                            ))
                        }
                        </>
                }
            </List>
        </Grid>
    )
}

export default ListContainer
