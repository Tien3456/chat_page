import React, { useRef, useEffect } from 'react'
import { 
    Grid, CircularProgress, Container,
    makeStyles, useTheme, useMediaQuery
} from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Avatar from '../../components/Avatar'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Message from './Message'
import { useSelector, useDispatch } from 'react-redux'
import { useInfiniteScrolling } from '../../hooks/useInfiniteScrolling'
import { usePrevious } from '../../hooks/usePrevious'
import { actions } from '../../redux/chat/actions'

const useStyles = makeStyles(theme => ({
    root: {
        overflow: "hidden",
        [theme.breakpoints.only('xs')]: {
            height: "calc(100% - 12% - 12%)",
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        },
        [theme.breakpoints.up('sm')]: {
            height: "80%",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        }
    },
    loadingWrapper: {
        height: props => props.offset > 0 ? "15%" : "100%"
    },
    list: {
        overflowX: "hidden",
        overflowY: props => props.isLoading ? "hidden" : "auto",
        maxHeight: "100%",
        width: "100%"
    },
    viewersWrapper: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    }
}))

const MessagesList = ({ limit }) => {

    const { user } = useSelector(state => state.auth)
    const { conversation } = useSelector(state => state.chat)

    const userId = user._id

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const dispatch = useDispatch()
    const listRef = useRef()
    const prevOffset = useRef()
    const lastMessageInPreviousPayload = useRef()

    const offset = conversation.messagesList.length
    const maxOffset = conversation.messagesQty

    const classes = useStyles({
        isLoading: conversation.isLoading,
        offset
    })

    const scrollToBottom = () => {
        if(listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight
        }
    }

    const getConversation = () => {
        if(conversation.roomId) {
            dispatch(actions.doGetConversation(conversation.roomId, offset, limit))
        }
    }

    const { handleScroll } = useInfiniteScrolling(
        'scrollUp',
        offset,
        maxOffset,
        limit,
        lastMessageInPreviousPayload,
        getConversation
    )

    useEffect(() => {
        if(conversation.messagesList.length > 0 && offset <= limit) {
            scrollToBottom()
        }
    }, [conversation.messagesList])

    useEffect(() => {
        if(prevOffset.current && prevOffset.current + 1 === offset) {
            scrollToBottom()
        }
        prevOffset.current = offset
    }, [offset])

    const viewersWrapperEl = (
        <Grid 
            container
            alignItems="center"
            justifyContent="flex-end"
            className={ classes.viewersWrapper }
        >
            {
                conversation.viewers.length === 0
                    ? <CheckCircleIcon color="primary" fontSize="small" />
                    : <AvatarGroup total={ conversation.viewersQty }>
                        {
                            conversation.viewers.map(viewer => (
                                <Avatar
                                    key={ viewer._id }
                                    width={ 36 } height={ 36 }
                                    src={ viewer.avatarSrc }
                                    gender={ viewer.gender }
                                />
                            ))
                        }
                    </AvatarGroup>
            }
        </Grid>
    )

    return (
        <Grid
            container
            alignItems="flex-end"
            className={ classes.root }
        >
            {
                conversation.isLoading &&
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className={ classes.loadingWrapper }
                    >
                        <CircularProgress size={ offset > 0 ? 20 : 30 } />
                    </Grid>
            }
            <Grid 
                container
                direction="column"
                spacing={ 1 }
                className={ classes.list }
                ref={ listRef }
                wrap="nowrap"
                onScroll={ handleScroll }
            >
                {
                    conversation.messagesList.map((message, i) => (
                        prevOffset.current && i === offset - prevOffset.current
                            ? <Grid 
                                item container 
                                key={ `${message._id}${i}` }
                                ref={ lastMessageInPreviousPayload }
                            >
                                <Message
                                    message={ message }
                                    userId={ userId }
                                />
                            </Grid>
                            : <Grid 
                                item container 
                                key={ `${message._id}${i}` }
                            >
                                <Message
                                    message={ message }
                                    userId={ userId }
                                />
                            </Grid>
                    ))
                }
                {
                    conversation.messagesList.length > 0 &&
                    conversation.messagesList[conversation.messagesList.length - 1].sender._id === userId &&
                    !conversation.isLoading &&
                        <>
                        {
                            isXs
                                ? <Container>
                                    { viewersWrapperEl }
                                </Container>
                                : <>{ viewersWrapperEl }</>
                        }
                        </>
                }
            </Grid>
        </Grid>
    )
}

export default MessagesList
