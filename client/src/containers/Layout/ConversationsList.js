import React, { useEffect, useRef, useState } from 'react'
import { 
    Box, List, CircularProgress,
    makeStyles, useTheme, useMediaQuery
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Conversation from './Conversation'
import Skeleton from '@material-ui/lab/Skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { actions as chatActions } from '../../redux/chat/actions'
import { useInfiniteScrolling } from '../../hooks/useInfiniteScrolling'
import { useAsync } from '../../hooks/useAsync'
import { api } from '../../api/index'

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.only('xs')]: {
            position: "absolute",
            top: "10%",
            width: "100%",
            height: `calc(100% - 10% - 10%)`
        },
        [theme.breakpoints.up('sm')]: {
            height: `calc(100% - 10%)`
        },
        '& .MuiList-root': {
            height: "100%",
            overflow: "auto",
            padding: 0,
            '&::-webkit-scrollbar': {
                width: "10px"
            },
            '&::-webkit-scrollbar-thumb': {
                background: grey[300]
            }
        }
    }
}))

const ConversationsList = () => {

    const location = useLocation()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const dispatch = useDispatch()
    const classes = useStyles()
    const prevOffset = useRef()
    const latestItemInPreviousPage = useRef()
    const limit = 10

    const { user } = useSelector(state => state.auth)
    const { conversations } = useSelector(state => state.chat)
    
    const offset = conversations.list.length
    const maxOffset = conversations.qty

    const getConversationsList = () => {
        dispatch(chatActions.doGetConversationsList(offset, limit))
    }

    const getConversationsQty = useAsync(() => {
        return api.get(`/chat/list/qty`)
    })

    useEffect(() => {
        if(getConversationsQty.value?.conversationsQty) {
            getConversationsList()
        }
    }, [getConversationsQty.value])

    useEffect(() => {
        prevOffset.current = offset
    }, [offset])

    const { handleScroll } = useInfiniteScrolling(
        'scrollDown',
        offset,
        maxOffset,
        limit,
        latestItemInPreviousPage,
        getConversationsList
    )

    const listItemLoadingEl = (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: isXs ? `calc(100% / 7)` : `calc(100% / 8)`,
                    padding: theme.spacing(2)
                }}
            >
                <Skeleton
                    variant="circle"
                    width={ 56 } height={ 56 }
                    animation="wave"
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        ml: 1,
                        width: `calc(100% - 56px - ${theme.spacing(1)}px)`
                    }}
                >
                    <Skeleton 
                        variant="text"
                        width="40%" height={ 20 }
                        animation="wave"
                    />
                    <Box
                        sx={{ 
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Skeleton 
                            variant="text"
                            width="45%" height={ 20 }
                            animation="wave"
                        />
                        <Skeleton 
                            variant="text"
                            width="35%" height={ 20 }
                            animation="wave"
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )

    return (
        <Box className={ classes.root }>
            <List onScroll={ handleScroll }>
                {
                    conversations.list.map((conversation, i) => (
                        prevOffset.current || 0 === i
                            ? <Conversation
                                key={ conversation._id }
                                ref={ latestItemInPreviousPage }
                                {...conversation}
                                userId={ user._id }
                                isActive={ 
                                    location.pathname.replace("/chat/", "") === conversation.roomId
                                }
                            />
                            : <Conversation
                                key={ conversation._id }
                                {...conversation}
                                userId={ user._id }
                                isActive={ 
                                    location.pathname.replace("/chat/", "") === conversation.roomId
                                }
                            />
                    ))
                }
                {
                    offset === 0 &&
                    getConversationsQty.value?.conversationsQty &&
                    conversations.isLoading &&
                        Array.from(Array(getConversationsQty.value?.conversationsQty < limit ? getConversationsQty.value?.conversationsQty : limit)
                             .keys())
                             .map((index, i) => (
                            <React.Fragment key={ i }>
                                { listItemLoadingEl }
                            </React.Fragment>
                        ))
                }
                {
                    offset !== 0 &&
                    conversations.isLoading &&
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 3
                            }}
                        >
                            <CircularProgress size={ isXs ? 18 : 23 } />
                        </Box>
                }
            </List>
        </Box>
    )
}

export default ConversationsList
