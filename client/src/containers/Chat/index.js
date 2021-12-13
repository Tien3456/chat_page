import React, { useEffect, useContext } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import Menu from './Menu'
import MessagesList from './MessagesList'
import ChatForm from './ChatForm'
import { AppContext } from '../../ProvideApp'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/chat/actions'
import { chatEvents } from '../socket/chat'
import { api } from '../../api/index'
import { useAsync } from '../../hooks/useAsync'

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        [theme.breakpoints.only('xs')]: {
            position: "absolute",
            top: props => `-${props.windowSize.height * 0.1}px`,
            height: props => `${props.windowSize.height}px`,
            background: theme.color.white.main
        },
        [theme.breakpoints.up('sm')]: {
            height: "100%"
        }
    }
}))

const Chat = () => {

    const { windowSize } = useContext(AppContext)

    const classes = useStyles({
        windowSize
    })
    const roomId = useParams().id
    const dispatch = useDispatch()
    const limit = 20

    const { userId } = useSelector(state => state.auth)
    const { conversation } = useSelector(state => state.chat)

    const updateLatestSeen = useAsync(() => {
        return api.get(`/chat/${roomId}/saw`)
    }, false)

    useEffect(() => {
        return () => {
            dispatch(actions.doResetConversation())
            updateLatestSeen.execute()
        }
    }, [])

    useEffect(() => {
        dispatch(actions.doResetConversation())
    }, [roomId])

    useEffect(() => {
        if(!conversation.roomId) {
            const offset = 0
            dispatch(actions.doGetConversation(roomId, offset, limit))
        }
    }, [conversation.roomId])

    useEffect(() => {
        if(conversation.messagesList.length > 0) {
            const latestMessage = conversation.messagesList[conversation.messagesList.length - 1]
            if(latestMessage.sender._id !== userId) {
                chatEvents.emitSeeConversation(roomId)
                dispatch(actions.doResetNewMessagesQty())
            }
        }
    }, [conversation.messagesList])

    return (
        <Box className={ classes.root }>
            <Menu />
            <MessagesList limit={ limit } />
            <ChatForm />
        </Box>
    )
}

export default Chat
