import React, { useEffect, useRef } from 'react'
import Item from './Item'
import { 
    List, Grid, Typography, CircularProgress, 
    makeStyles 
} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { useSelector, useDispatch } from 'react-redux'
import { useInfiniteScrolling } from '../../hooks/useInfiniteScrolling'
import { actions } from '../../redux/notifications/actions'

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        overflow: "auto",
        padding: 0,
        '&.list-loading': {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
        }
    },
    loadingWrapper: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}))

const ListContainer = () => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const limit = 20
    const latestItemInPreviousPage = useRef()
    const prevOffset = useRef()

    const { isLoading, list, qty } = useSelector(state => state.notifications)
    const offset = list.length
    const maxOffset = qty
    const scrollingType = 'scrollDown'

    const getNotifications = () => {
        actions.doGetNotificationsList(offset, limit)
    }

    const { handleScroll } = useInfiniteScrolling(
        scrollingType,
        offset,
        maxOffset,
        limit,
        latestItemInPreviousPage,
        getNotifications
    )

    useEffect(() => {
        const offset = 0
        dispatch(actions.doGetNotificationsList(offset, limit))
    }, [])

    useEffect(() => {
        prevOffset.current = offset
    }, [offset])

    const noItemsEl = (
        <Grid 
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={ 1 }
            style={{ height: "100%" }}
        >
            <Grid item>
                <NotificationsIcon fontSize="large" />
            </Grid>
            <Grid item>
                <Typography>No notifications</Typography>
            </Grid>
        </Grid>
    )

    const loadingEl = (
        <Grid 
            container
            alignItems="center"
            justifyContent="center"
            className={ classes.loadingWrapper }
        >
            <CircularProgress size={ 18 } />
        </Grid>
    )

    return (
        <>
            {
                !isLoading && list.length === 0 &&
                    <>{ noItemsEl }</>
            }
            <List 
                className={ 
                    isLoading && offset > 0
                        ? `${classes.root} list-loading`
                        : classes.root
                }
                onScroll={ handleScroll }
            >
                {
                    list.map((notification, i) => (
                        prevOffset.current === i
                            ? <Item
                                key={ `notification${notification._id}` }
                                ref={ latestItemInPreviousPage }
                                {...notification}
                            />
                            : <Item
                                key={ `notification${notification._id}` }
                                {...notification}
                            />
                    ))
                }
                {
                    isLoading && offset > 0 &&
                        <>{ loadingEl }</>
                }
            </List>
        </>
    )
}

export default ListContainer
