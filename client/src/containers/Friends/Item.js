import React, { useEffect, useRef } from 'react'
import { 
    ListItem, ListItemAvatar, ListItemText, 
    Divider, Typography, Button, Box, CircularProgress, Grid
} from '@material-ui/core'
import Avatar from '../../components/Avatar'
import { useStyles } from './styles/Item'

const Item = React.memo((props) => {

    const classes = useStyles()

    const isClickedAcceptedButton = useRef(false)
    const directToProfile = useRef()

    const {
        isNavigatedToFriendsList,
        username, 
        avatarSrc,
        gender,
        navigateToProfile,
        acceptFriendRequest,
        isAcceptingRequest
    } = props

    useEffect(() => {
        return () => clearTimeout(directToProfile.current)
    }, [])

    const handleClickListItem = () => {
        if(isNavigatedToFriendsList) {
            navigateToProfile()
            return
        }
        directToProfile.current = setTimeout(() => {
            if(!isClickedAcceptedButton.current) {
                navigateToProfile()
            }
        }, 200)
    }

    const listItemEl = (
        <ListItem 
            className={ classes.listItem }
            onClick={ handleClickListItem }
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
                primary={ 
                    <>
                        <Typography component="span">
                            { username }
                        </Typography>
                        {
                            !isNavigatedToFriendsList &&
                                <Box sx={{ position: "relative" }}>
                                    <Button 
                                        variant="contained" color="primary"
                                        className={ classes.acceptButton }
                                        onClick={() => {
                                            isClickedAcceptedButton.current = true
                                            acceptFriendRequest()
                                        }}
                                        disabled={ isAcceptingRequest }
                                    >
                                        Accept
                                    </Button>
                                    {
                                        isAcceptingRequest &&
                                            <Grid 
                                                container
                                                alignItems="center"
                                                justifyContent="center"
                                                className={ classes.loadingWrapper }
                                            >
                                                <CircularProgress color="inherit" size={ 18 } />
                                            </Grid>
                                    }
                                </Box>
                        }
                    </>
                }
            />
        </ListItem>
    )

    return (
        <>
            { listItemEl }
            <Divider className={ classes.divider } component="li" variant="inset" />
        </>
    )
})

export default Item
