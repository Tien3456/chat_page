import React, { useState, useEffect } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import Navigation from './Navigation'
import List from './List'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/friends/actions'

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.color.white.main,
        [theme.breakpoints.only('xs')]: {
            height: "100%",
        },
        [theme.breakpoints.up('sm')]: {
            height: "60%",
            width: "350px"
        }
    }
}))

const Friends = () => {

    const dispatch = useDispatch()
    const limit = 20
    
    const classes = useStyles()

    const [isNavigatedToFriendsList, setNavigateToFriendsList] = useState(true)

    useEffect(() => {
        const offset = 0

        if(isNavigatedToFriendsList) {
            dispatch(actions.doResetFriendRequestsList())
            dispatch(actions.doGetFriendsList(offset, limit))
            return
        }
        dispatch(actions.doResetFriendsList())
        dispatch(actions.doGetFriendRequestsList(offset, limit))
    }, [isNavigatedToFriendsList])

    return (
        <Box className={ classes.root }>
            <Navigation 
                isNavigatedToFriendsList={ isNavigatedToFriendsList }
                setNavigateToFriendsList={ setNavigateToFriendsList }
            />
            <List isNavigatedToFriendsList={ isNavigatedToFriendsList } />
        </Box>
    )
}

export default Friends
