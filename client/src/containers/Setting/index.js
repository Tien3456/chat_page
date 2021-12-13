import React from 'react'
import { 
    List, ListItem, ListItemText, ListItemAvatar, Divider,
    Typography, Grid, Icon,
    makeStyles
} from '@material-ui/core'
import Avatar from '../../components/Avatar'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actions as authActions } from '../../redux/auth/actions'

const useStyles = makeStyles(theme => ({
    list: {
        height: "100%",
        background: theme.color.white.light
    },
    listItemAvatar: {
        marginRight: theme.spacing(2)
    },
    listItemText: {
        '& .MuiListItemText-primary': {
            fontWeight: "bold",
        },
        '& .username': {
            opacity: 0.8,
            fontWeight: "bold"
        }
    }
}))

const Setting = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    const { user } = useSelector(state => state.auth)
    
    return (
        <List className={ classes.list }>
            <ListItem onClick={() => history.push(`/profile/${user._id}`)}>
                <ListItemAvatar className={ classes.listItemAvatar }>
                    <Avatar
                        width={ 56 } height={ 56 }
                        src={ user?.avatarSrc }
                        gender={ user?.gender }
                    />
                </ListItemAvatar>
                <ListItemText 
                    className={ classes.listItemText }
                    primary={
                        <Typography className="username" component="span">
                            { user?.username }
                        </Typography>
                    } 
                />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText 
                    className={ classes.listItemText }
                    primary={
                        <Typography color="secondary" component="span">
                            Change password
                        </Typography>
                    }
                />
            </ListItem>
            <Divider component="li" />
            <ListItem onClick={() => dispatch(authActions.doLogOut())}>
                <ListItemText 
                    className={ classes.listItemText }
                    primary={ 
                        <Typography component="span">
                            <Grid 
                                container 
                                alignItems="center"
                                spacing={ 1 }
                            >
                                <Grid item>
                                    <Icon 
                                        color="secondary" 
                                        className="fas fa-sign-out-alt" 
                                    />
                                </Grid>
                                <Grid>
                                    Log out
                                </Grid>
                            </Grid>
                        </Typography>
                    } 
                />
            </ListItem>
            <Divider component="li" />
        </List>
    )
}

export default Setting
