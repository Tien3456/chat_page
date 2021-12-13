import React, { useState, useRef, useEffect } from 'react'
import { 
    ListItemAvatar, ListItemText,
    Badge, Typography, Divider, Box
} from '@material-ui/core'
import ListItem from '../../components/ListItem'
import PersonIcon from '@material-ui/icons/Person'
import Avatar from '../../components/Avatar'
import Moment from 'react-moment'
import { useStyles } from './styles/Item'

const Item = React.memo((props) => {

    const classes = useStyles()

    const avatarEl = (
        <Badge
            className={ classes.badge }
            badgeContent={
                props.notiType === 'acceptFriendReq' &&
                    <Box
                        sx={{
                            padding: "3px",
                            background: "rgba(255, 255, 255, 0.4)",
                            borderRadius: "50%"
                        }}
                    >
                        <PersonIcon fontSize="small" />
                    </Box>
            }
            overlap="circular"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
        >
            <Avatar
                width="100%" height="100%"
                src={ props.sender?.avatarSrc }
                gender={ props.sender?.gender }
            />
        </Badge>
    )

    const primaryEl = (
        <Typography 
            component="span"
            className={ classes.username }
        >
            {
                props.notiType === 'acceptFriendReq' &&
                <>
                    <b>{ props.sender?.username } </b>
                    accepted your friend request
                </>
            }
        </Typography>
    )

    const secondaryEl = (
        <>
            <Typography component="span">
                <Box 
                    color="text.disabled"
                    sx={{
                        '& time': {
                            fontSize: "13px"
                        }
                    }}
                >
                    <Moment fromNow>
                        { new Date(props.createdAt).toString() }
                    </Moment>
                </Box>
            </Typography>
        </>
    )

    return (
        <ListItem
            primary={ primaryEl }
            secondary={ secondaryEl }
            avatar={ avatarEl }
            height="calc(100% / 6)"
        />
    )
})

export default Item
