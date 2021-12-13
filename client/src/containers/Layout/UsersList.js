import React, { useState, useContext, useEffect, useRef } from 'react'
import UserItem from './UserItem'
import { Box, List, makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { AppContext } from '../../ProvideApp'
import { useInfiniteScrolling } from '../../hooks/useInfiniteScrolling'
import { useNavigate } from '../../hooks/useNavigate'
import { actions } from '../../redux/users/actions'

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        background: theme.color.white.main,
        [theme.breakpoints.only('xs')]: {
            height: props => `calc(${props.windowSize.height}px - 0.2 * ${props.windowSize.height}px)`
        },
        [theme.breakpoints.up('sm')]: {
            height: props => `calc(${props.windowSize.height}px - 0.1 * ${props.windowSize.height}px)`
        },
        zIndex: 99,
        borderTop: `1px solid ${theme.color.gray.light}`,
        transform: "scaleY(0)",
        WebkitTransform: "scaleY(0)",
        MozTransform: "scaleY(0)",
        msTransform: "scaleY(0)",
        oTransform: "scaleY(0)",
        transition: "all 0.3s ease-out",
        WebkitTransition: "all 0.3s ease-out",
        MozTransition: "all 0.3s ease-out",
        msTransition: "all 0.3s ease-out",
        oTransition: "all 0.3s ease-out",
        transformOrigin: "top center",
        WebkitTransformOrigin: "top center",
        msTransformOrigin: "top center",
        oTransformOrigin: "top center",
        MozTransformOrigin: "top center",
        '&.show': {
            transform: "scaleY(1)",
            WebkitTransform: "scaleY(1)",
            MozTransform: "scaleY(1)",
            msTransform: "scaleY(1)",
            oTransform: "scaleY(1)"
        }
    },
    list: {
        padding: 0,
        height: "100%",
        overflow: "auto"
    }
}))

const UsersList = ({ username, onlyOtherUsers, limit }) => {

    const { windowSize } = useContext(AppContext)

    const dispatch = useDispatch()
    const classes = useStyles({
        windowSize
    })
    const updateUsers = useRef()
    const listRef = useRef()
    
    const [users, setUsers] = useState([])

    const { navigateToProfile } = useNavigate()

    const { searchedUsers } = useSelector(state => state.users)
    const offset = searchedUsers.list.length
    const maxOffset = searchedUsers.qty

    const searchUsers = () => {
        dispatch(actions.doSearchUsers(username, offset, limit, onlyOtherUsers))
    }
    
    useEffect(() => {
        return () => {
            if(updateUsers.current) {
                clearTimeout(updateUsers.current)
            }
        }
    }, [])

    useEffect(() => {
        if(
            users.length === 0 && searchedUsers.list.length > 0 ||
            users.length > 0 && searchedUsers.list.length === 0
        ) {
            // wait for users list scale then update
            updateUsers.current = setTimeout(() => setUsers(searchedUsers.list), 300)
            return
        }
        setUsers(searchedUsers.list)
    }, [searchedUsers])

    useInfiniteScrolling(
        'scrollDown',
        offset,
        maxOffset,
        limit,
        null,
        searchUsers
    )

    return (
        <Box 
            className={ 
                searchedUsers.list.length > 0
                    ? `${classes.root} show`
                    : classes.root 
            }
        >
            <List 
                className={ classes.list }
                ref={ listRef }
            >
                {
                    searchedUsers.list.map(user => (
                        <UserItem
                            key={ `user-${user._id}` }
                            {...user}
                            isAbleToNavigateToChat={ onlyOtherUsers }
                            navigateToProfile={() => navigateToProfile(user._id)}
                        />
                    ))
                }
            </List>
        </Box>
    )
}

export default UsersList
