import React, { useEffect, useCallback } from 'react'
import { Box, List, makeStyles } from '@material-ui/core'
import Member from './Member'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../redux/chat/actions'
import { useNavigate } from '../../hooks/useNavigate'

const useStyles = makeStyles(theme => ({
    list: {
        overflow: "auto",
        width: "100%",
        height: "100%",
        padding: 0
    }
}))

const Members = () => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const limit = 20

    const { conversation } = useSelector(state => state.chat)

    const { navigateToProfile } = useNavigate()

    useEffect(() => {
        if(conversation.roomId) {
            const roomId = conversation.roomId
            const offset = 0
            dispatch(actions.doGetMembers(roomId, offset, limit))
        }
    }, [])

    return (
        <Box 
            sx={{ 
                height: "100%",
                width: "100%"
            }}
        >
            <List className={ classes.list }>
                {
                    conversation.members.map(member => (
                        <Member
                            key={ `group-chat-member${member.memberId}` }
                            {...member}
                            navigateToProfile={() => navigateToProfile(member.memberId)}
                        />
                    ))
                }
            </List>
        </Box>
    )
}

export default Members
