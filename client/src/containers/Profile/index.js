import React, { useEffect } from 'react'
import { Grid, Box, makeStyles } from '@material-ui/core'
import Profile from './Profile'
import ButtonGroup from './ButtonGroup'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { actions } from '../../redux/users/actions'

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.only('xs')]: {
            background: theme.color.white.main,
            overflowY: "auto",
            height: "100%", 
            paddingTop: theme.spacing(3)
        },
        [theme.breakpoints.up('sm')]: {
            background: theme.color.white.light,
            padding: `${theme.spacing(5)}px ${theme.spacing(4)}px`
        }
    }
}))

const ProfileContainer = () => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const { id } = useParams()
    const location = useLocation()

    const { currentUser } = useSelector(state => state.users)

    useEffect(() => {
        return () => dispatch(actions.doResetCurrentUser())
    }, [])

    useEffect(() => {
        if(id && location.pathname.replace(`/${id}`, "") === '/profile') {
            dispatch(actions.doGetUserInfo(id))
        }
    }, [id])

    return (
        <Box className={ classes.root }>
            <Profile />
            { !currentUser.isLoading && <ButtonGroup /> }
        </Box>
    )
}

export default ProfileContainer
