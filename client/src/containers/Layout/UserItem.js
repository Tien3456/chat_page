import React from 'react'
import { 
    ListItem, ListItemAvatar, ListItemText, 
    Container, Divider, Box, IconButton,
    makeStyles, useTheme, useMediaQuery
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import Avatar from '../../components/Avatar'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions as chatActions } from '../../redux/chat/actions'

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.only('xs')]: {
            height: "calc(100% / 7)",
        },
        [theme.breakpoints.up('sm')]: {
            height: "calc(100% / 8)"
        },
        cursor: "pointer"
    },
    listItem: {
        position: "relative",
        [theme.breakpoints.only('xs')]: {
            paddingRight: 0,
            paddingLeft: 0,
        },
        [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        height: "100%"
    },
    listItemText: {
        marginLeft: theme.spacing(1)
    },
    navigateButton: {
        position: "absolute",
        top: "50%",
        right: theme.spacing(2),
        transform: "translateY(-50%)",
        WebkitTransform: "translateY(-50%)",
        MozTransform: "translateY(-50%)",
        msTransform: "translateY(-50%)",
        oTransform: "translateY(-50%)"
    },
    divider: {
        marginLeft: `calc(56px + ${theme.spacing(3)}px)`
    }
}))

const UserItem = React.memo((props) => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const {
        _id,
        username,
        avatarSrc,
        gender,
        isAbleToNavigateToChat,
        navigateToProfile
    } = props

    const listItemEl = (
        <ListItem 
            className={ classes.listItem }
            onClick={ navigateToProfile }
        >
            <ListItemAvatar>
                <Avatar
                    width={ 56 } height={ 56 }
                    src={ avatarSrc }
                    gender={ gender }
                />
            </ListItemAvatar>
            <ListItemText 
                className={ classes.listItemText }
                primary={ username }
            />
            {
                isAbleToNavigateToChat &&
                    <IconButton 
                        className={ classes.navigateButton }
                        onClick={() => dispatch(chatActions.doCreateGroup([_id], history))}
                    >
                        <SendIcon color="primary" />
                    </IconButton>
            }
        </ListItem>
    )

    return (
        <Box className={ classes.root }>
            {
                isXs
                    ? <Container>
                        { listItemEl }
                    </Container>
                    : <>{ listItemEl }</>
            }
            <Divider className={ classes.divider } component="li" variant="inset" />
        </Box>
    )
})

export default UserItem