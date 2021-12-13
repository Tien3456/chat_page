import React, { useContext, useEffect } from 'react'
import { Box, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import Header from './Header'
import SearchForm from './SearchForm'
import ConversationList from './ConversationsList'
import Modal from '../Modal/index'
import { AppContext } from '../../ProvideApp'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { socket, socketEventsListener } from '../socket/index'
import { actions as friendActions } from '../../redux/friends/actions'
import { actions as notificationActions } from '../../redux/notifications/actions'

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        width: props => props.windowSize.width,
        height: props => props.windowSize.height,
        [theme.breakpoints.up('sm')]: {
            display: "flex"
        }
    },
    sideBar: {
        width: "30%",
        height: "100%",
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 12%), 0px 4px 5px 0px rgb(0 0 0 / 8%), 0px 1px 10px 0px rgb(0 0 0 / 5%)"
    },
    main: {
        [theme.breakpoints.only('xs')]: {
            position: "absolute",
            top: "10%",
            width: "100%",
            height: "calc(100% - 20%)",
            zIndex: props => props.path === '/' ? -1 : 9999
        },
        [theme.breakpoints.up('sm')]: {
            width: "calc(100% - 30% - 12%)",
            height: "100%"
        }
    }
}))

const Layout = ({ children }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const { windowSize } = useContext(AppContext)
    const classes = useStyles({
        windowSize,
        path: location.pathname
    })

    useEffect(() => {
        socket.connect()
        socket.on('connect', socketEventsListener)
        dispatch(friendActions.doGetNewReceivedFriendReqsQty())
        dispatch(notificationActions.doGetNewNotificationsQty())
    }, [])

    const sideBar = (
        <>
            <SearchForm />
            <ConversationList />
        </>
    )

    return (
        <Box className={ classes.root }>
            <Header />
            {
                isXs
                    ? <>{ sideBar }</>
                    : <Box className={ classes.sideBar }>
                        { sideBar }
                    </Box>
            }
            <Box className={ classes.main }>
                { children }
            </Box>
            <Modal />
        </Box>
    )
}

export default Layout
