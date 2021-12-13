import React, { useEffect } from 'react'
import List from './List'
import { 
    Grid, Box, Typography, Container,
    useTheme, useMediaQuery, makeStyles
} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/notifications/actions'

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.color.white.main,
        [theme.breakpoints.only('xs')]: {
            height: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "350px",
            height: "60%"
        }
    },
    headingWrapper: {
        [theme.breakpoints.only('xs')]: {
            borderBottom: `1px solid ${theme.color.gray.light}`
        },
        [theme.breakpoints.up('sm')]: {
            boxShadow: "0 3px 2px rgb(0 0 0 / 10%)",
            WebkitBoxShadow: "0 3px 2px rgb(0 0 0 / 10%)",
            MozBoxShadow: "0 3px 2px rgb(0 0 0 / 10%)"
        }
    },
    heading: {
        fontWeight: "bold",
        fontSize: "20px"
    }
}))

const Notifications = () => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()

    useEffect(() => {
        dispatch(actions.doSetNewNotificationsQty(0))
        return () => dispatch(actions.doResetNotifications())
    }, [])

    const headingEl = (
        <Box 
            sx={{ 
                py: 1,
                px: isXs ? 0 : 2,
                width: "100%"
            }}
        >
            <Grid 
                container 
                alignItems="center"
                spacing={ 1 }
            >
                <Grid item>
                    <NotificationsIcon />
                </Grid>
                <Grid item>
                    <Typography 
                        component="h4" variant="h5"
                        className={ classes.heading }
                    >
                        Notifications
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )

    return (
        <Grid 
            container
            direction="column"
            wrap="nowrap"
            className={ classes.root }
        >
            <Box className={ classes.headingWrapper }>
                {
                    isXs
                        ? <Container>
                            { headingEl }
                        </Container>
                        : <>{ headingEl }</>
                }
            </Box>
            <List />
        </Grid>
    )
}

export default Notifications
