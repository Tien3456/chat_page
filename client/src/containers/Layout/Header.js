import React, { useState } from 'react'
import { 
    AppBar, Toolbar, Container, Icon, Typography,
    IconButton, Box, Badge, Menu, MenuItem,
    useTheme, useMediaQuery
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import { useStyles } from './styles/Header'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from '../../hooks/useNavigate'
import { useAsync } from '../../hooks/useAsync'
import { api } from '../../api/index'
import { actions as authActions } from '../../redux/auth/actions'

const Header = () => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles({
        isXs
    })
    const history = useHistory()

    const [anchorMenuEl, setAnchorMenuEl] = useState(null)

    const isOpenedMenu = Boolean(anchorMenuEl)

    const { user } = useSelector(state => state.auth)
    const { conversations } = useSelector(state => state.chat)
    const { newReceivedFriendReqsQty } = useSelector(state => state.friends)
    const { newNotificationsQty } = useSelector(state => state.notifications)

    const handleClickMenuItem = e => setAnchorMenuEl(e.currentTarget)
    const handleCloseSettingMenu = () => setAnchorMenuEl(null)

    const handleClickSettingButton = e => {
        if(isXs) {
            history.push('/settings')
            return
        }
        handleClickMenuItem(e)
    }

    const { 
        navigateToProfile,
        navigateToFriends,
        navigateToNotifications
    } = useNavigate()

    const updateNewNotifications = useAsync(() => {
        return api.get('/notifications/update-new')
    }, false)

    const buttonGroup = (
        <>
            <IconButton 
                onClick={() => history.push('/')}
            >
                <Badge
                    color="error"
                    badgeContent={ conversations.newConversationsQty }
                >
                    <HomeIcon color="primary" />
                </Badge>
            </IconButton>
            <IconButton onClick={() => navigateToFriends()}>
                <Badge
                    color="error"
                    badgeContent={ newReceivedFriendReqsQty }
                >
                    <PersonIcon color="primary" />
                </Badge>
            </IconButton>
            <IconButton 
                onClick={() => {
                    navigateToNotifications()
                    if(newNotificationsQty !== 0) {
                        updateNewNotifications.execute()
                    }
                }}>
                <Badge
                    color="error"
                    badgeContent={ newNotificationsQty }
                >
                    <NotificationsIcon color="primary" />
                </Badge>
            </IconButton>
        </>
    )

    const settingButtonEl = (
        <IconButton 
            id="setting-button"
            aria-controls="setting-menu"
            aria-haspopup="true"
            aria-expanded={isOpenedMenu ? 'true' : undefined}   
            onClick={ handleClickSettingButton }
        >
            <SettingsIcon color="primary" />
        </IconButton>
    )

    const settingMenuEl = (
        <Menu
            id="setting-menu"
            anchorEl={ anchorMenuEl }
            open={ isOpenedMenu }
            onClose={ handleCloseSettingMenu }
            MenuListProps={{
                'aria-labelledby': 'setting-button'
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem
                onClick={() => {
                    handleCloseSettingMenu()
                    navigateToProfile(user?._id)
                }}
            >
                Profile
            </MenuItem>
            <MenuItem>
                <Typography color="secondary">
                    Change password
                </Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(authActions.doLogOut())}>
                <Icon 
                    className="fas fa-sign-out-alt" 
                    color="secondary"
                />
                &nbsp; Log out
            </MenuItem>
        </Menu>
    )

    return (
        <AppBar className={ classes.root }>
            <Toolbar className={ classes.toolbar }>
                {
                    isXs
                        ? <>{ buttonGroup }</>
                        : <Box className={ classes.buttonGroup }>
                            { buttonGroup }
                        </Box>
                }
                {
                    isXs
                        ? <>{ settingButtonEl }</>
                        : <Box>
                            { settingButtonEl }
                            { settingMenuEl }
                        </Box>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header