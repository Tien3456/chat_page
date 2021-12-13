import React, { useEffect } from 'react'
import { Grid, Button, Box, CircularProgress } from '@material-ui/core'
import { useStyles } from './styles/ButtonGroup'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../redux/users/actions'
import { actions as friendActions } from '../../redux/friends/actions'
import { useUpdateEffect } from '../../hooks/useUpdateEffect'

const ButtonGroup = () => {

    const dispatch = useDispatch()

    const { currentUser } = useSelector(state => state.users)
    const { contactHandling } = useSelector(state => state.friends)

    const { _id, isContact, isFriend, isSendingFriendReq, isSentFriendReq } = currentUser.info
    const {
        addingRequests,
        cancelingRequests,
        acceptingRequests,
        removingRequests
    } = contactHandling

    const handlingRequests = [].concat(addingRequests, cancelingRequests, acceptingRequests, removingRequests)

    const isHandling = handlingRequests.indexOf(_id) !== -1

    const classes = useStyles({ isHandling })

    useUpdateEffect(() => {
        if(!isHandling) {
            if(!isFriend && !isSendingFriendReq && !isSentFriendReq) {
                dispatch(actions.doSetIsSendingFriendReq(true))
            } else if(!isFriend && isSendingFriendReq && !isSentFriendReq) {
                dispatch(actions.doSetIsSendingFriendReq(false))
            } else if(!isFriend && !isSendingFriendReq && isSentFriendReq) {
                dispatch(actions.doSetIsSentFriendReq(false))
                dispatch(actions.doSetIsFriend(true))
            } else if(isFriend && !isSendingFriendReq && !isSentFriendReq) {
                dispatch(actions.doSetIsFriend(false))
            }
        }
    }, [isHandling])

    const loadingEl = (
        <Grid 
            container
            alignItems="center"
            justifyContent="center"
            className={ classes.loadingWrapper }
        >
            <CircularProgress color="inherit" size={ 18 } />
        </Grid>
    )

    return (
        <Grid 
            container
            justifyContent="center"
            alignItems="center"
            spacing={ 2 }
            className={ classes.root }
        >
            {
                !isContact 
                    ? <Grid item>
                        <Button variant="contained" color="primary">Save</Button>
                    </Grid>
                    : <>
                        <Grid item>
                            <Button className={`${classes.contactButton} left-button`}>
                                Inbox
                            </Button>
                        </Grid>
                        <Grid item>
                            <Box className={ classes.buttonWrapper }>
                                {
                                    isFriend && !isSendingFriendReq && !isSentFriendReq &&
                                        <Button 
                                            className={`${classes.contactButton} right-button`}
                                            onClick={() => dispatch(friendActions.doRemoveFriend(_id))}
                                            disabled={ isHandling }
                                        >
                                            Unfriend
                                        </Button>
                                }
                                {
                                    !isFriend && isSendingFriendReq && !isSentFriendReq &&
                                        <Button 
                                            className={`${classes.contactButton} right-button`}
                                            onClick={() => dispatch(friendActions.doCancelAddingFriend(_id))}
                                            disabled={ isHandling }
                                        >
                                            Cancel adding
                                        </Button>
                                }
                                {
                                    !isFriend && !isSendingFriendReq && isSentFriendReq &&
                                        <Button 
                                            className={`${classes.contactButton} right-button`}
                                            onClick={() => dispatch(friendActions.doAcceptFriendRequest(_id))}
                                            disabled={ isHandling }
                                        >
                                            Accept
                                        </Button>
                                }
                                {
                                    !isFriend && !isSendingFriendReq && !isSentFriendReq &&
                                        <Button 
                                            className={`${classes.contactButton} right-button`}
                                            onClick={() => dispatch(friendActions.doAddFriend(_id))}
                                            disabled={ isHandling }
                                        >
                                            Add friend
                                        </Button>
                                }
                                { loadingEl }
                            </Box>
                        </Grid>
                    </>
            }
        </Grid>
    )
}

export default ButtonGroup
