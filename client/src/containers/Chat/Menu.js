import React from 'react'
import { 
    Box, Typography, Container, IconButton,
    useTheme, useMediaQuery
} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Avatar from '../../components/Avatar'
import AvatarGroup from '../../components/AvatarGroup'
import { useStyles } from './styles/Menu'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import { useHistory, Link } from 'react-router-dom'
import { useNavigate } from '../../hooks/useNavigate'

const Menu = () => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()
    const history = useHistory()

    const { 
        navigateToGroupMembers,
        navigateToProfile
    } = useNavigate()

    const { conversation } = useSelector(state => state.chat)

    const {
        isGroup,
        groupName,
        members,
        membersQty
    } = conversation

    const menuEl = (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%"
            }}
        >
            {
                isXs &&
                    <IconButton 
                        className={ classes.backButton }
                        onClick={() => history.goBack()}
                    >
                        <ArrowBackIosIcon fontSize="small" />
                    </IconButton>
            }
            <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                    if(!isGroup) {
                        navigateToProfile(members[0]?._id)
                        return
                    }
                    navigateToGroupMembers()
                }}
            >
                {
                    isGroup
                        ? <AvatarGroup
                            width={ 56 } height={ 56 }
                            members={ members }
                        />
                        : <Avatar
                            width={ 56 } height={ 56 }
                            src={ members.length > 0 && members[0].avatarSrc }
                            gender={ members.length > 0 && members[0].gender }
                        />
                }
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    ml: 2
                }}
            >
                <Typography>
                    {
                        isGroup
                            ? groupName
                            : members.length > 0 && members[0]?.username
                    }
                </Typography>
                <Box color="text.disabled">
                    <Typography>
                        {
                            isGroup
                                ? `${membersQty} members`
                                : (
                                    members.length > 0 && members[0]?.latestOnline &&
                                        <>
                                            Online &nbsp;
                                            <Moment fromNow>
                                                {
                                                    new Date(members[0]?.latestOnline)
                                                }
                                            </Moment>
                                        </>
                                )
                        }
                    </Typography>
                </Box>
            </Box>
        </Box>
    )

    return (
        <Box 
            sx={{
                display: "flex",
                alignItems: "center"
            }}
            className={ classes.root }
        >
            {
                isXs
                    ? <Container>
                        { menuEl }
                    </Container>
                    : <>{ menuEl }</>
            }
        </Box>
    )
}

export default Menu
