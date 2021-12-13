import React, { useEffect } from 'react'
import { 
    ListItem, ListItemAvatar, ListItemText, 
    Typography, Divider, Box, Container, Badge,
    useTheme, useMediaQuery
} from '@material-ui/core'
import Avatar from '../../components/Avatar'
import AvatarGroup from '../../components/AvatarGroup'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useStyles } from './styles/Conversation'
import { useParams, useLocation } from 'react-router-dom'

const Conversation = React.memo((props) => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))

    const {
        isGroup,
        groupName,
        roomId,
        latestMessage,
        members,
        newMessagesQty,
        userId
    } = props

    const classes = useStyles({ isActive: props.isActive })

    const listItem = (
        <ListItem className={ classes.listItem }>
            <ListItemAvatar className={ classes.listItemAvatar }>
                {
                    isGroup
                        ? <AvatarGroup
                            width={ 56 } height={ 56 }
                            members={ members }
                        />
                        : <Avatar
                            width={ 56 } height={ 56 }
                            src={ members[0].avatarSrc }
                            gender={ members[0].gender }
                        />
                }
            </ListItemAvatar>
            <ListItemText
                className={ classes.listItemText }
                primary={ 
                    <>
                        <Typography component="group-name">
                            {
                                isGroup ? groupName : members[0].username 
                            }
                        </Typography>
                        <Badge 
                            badgeContent={ newMessagesQty } 
                            color="error" 
                            max={ 5 }
                        />
                    </>
                }
                secondary={
                    <>
                        <Typography component="span" className="message-content">
                            {
                                latestMessage.msgType === 'normal'
                                    ? (
                                        latestMessage.text
                                            ? latestMessage.text
                                            : (
                                                latestMessage.senderId === userId
                                                    ? "You sent a file"
                                                    : "You received a file"
                                            )
                                    )
                                    : (
                                        latestMessage.msgType === 'createGroup'
                                            ? (
                                                latestMessage.senderId === userId
                                                    ? "You created this group"
                                                    : "A member created this group"
                                            )
                                            : <></>
                                    )
                            }
                        </Typography>
                        <Box color="text.disabled">
                            <Moment fromNow>
                                { new Date(latestMessage.createdAt).toString() }
                            </Moment>
                        </Box>
                    </>
                }
            />
        </ListItem>
    )

    return (
        <>
            <Link className={ classes.link } to={`/chat/${roomId}`}>
                {
                    isXs
                        ? <Container>
                            { listItem }
                        </Container>
                        : <>{ listItem }</>
                }
            </Link>
            <Divider className={ classes.divider } component="li" variant="inset" />
        </>
    )
})

export default Conversation
