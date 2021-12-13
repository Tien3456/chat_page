import React, { useRef, useEffect } from 'react'
import { 
    Grid, Typography, Box, Container,
    useTheme, useMediaQuery
} from '@material-ui/core'
import Avatar from '../../components/Avatar'
import Moment from 'react-moment'
import { useStyles } from './styles/Message'
import { useDispatch } from 'react-redux'
import { actions as modalActions } from '../../redux/modal/actions'
import { actions as fileActions } from '../../redux/file/actions'

const Message = React.memo(({ message, userId }) => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles({
        userId,
        message
    })

    const messageEl = (
        <Grid 
            className={ classes.root }
            container
            direction={ 
                message.msgType === 'normal'
                    ? message.sender._id === userId ? "row-reverse" : "row"
                    : "row"
            }
            spacing={ 2 }
        >
            {
                message.msgType === 'normal'
                    ? <>
                    <Grid item>
                        <Avatar
                            width={ 56 } height={ 56 }
                            src={ message.sender.avatarSrc }
                            gender={ message.sender.gender }
                        />
                    </Grid>
                    <Grid item className={ classes.messageWrapper }>
                        <Grid 
                            container
                            direction="column"
                            spacing={ 1 }
                        >
                            {
                                message.text &&
                                    <Grid item>
                                        <Grid 
                                            container
                                            justifyContent={
                                                message.sender._id === userId
                                                    ? "flex-end"
                                                    : "flex-start"
                                            }
                                        >
                                            <Typography className={ classes.textMessage }>
                                                { message.text }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                            }
                            {
                                message.files.length > 0 &&
                                    <Grid item>
                                        <Grid 
                                            container
                                            justifyContent={
                                                message.sender._id === userId
                                                    ? "flex-end"
                                                    : "flex-start"
                                            }
                                        >
                                            <Box className={ classes.filesMessage }>
                                                {
                                                    message.files.map(file => (
                                                        <Box 
                                                            key={ file }
                                                            className="img-wrapper"
                                                            onClick={() => {
                                                                dispatch(fileActions.doSetFileSrc('image', file))
                                                                dispatch(modalActions.doOpenModal('file'))
                                                            }}
                                                        >
                                                            <img src={ file } />
                                                        </Box>
                                                    ))
                                                }
                                            </Box>
                                        </Grid>
                                    </Grid>
                            }
                            <Grid item>
                                <Grid 
                                    container
                                    justifyContent={
                                        message.sender._id === userId
                                            ? "flex-end"
                                            : "flex-start"
                                    }
                                >
                                    <Box color="text.disabled" className={ classes.timeMessage }>
                                        <Moment format="HH:mm DD-MM-YYYY">
                                            { new Date(message.createdAt).toString() }
                                        </Moment>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </>
                    : <Grid 
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box color="text.disabled">
                            <Typography>
                                {
                                    message.sender._id === userId
                                        ? "You created this group"
                                        : `${message.sender.username} created this group`
                                }
                            </Typography>
                        </Box>
                    </Grid>
            }
        </Grid>
    )

    return (
        isXs
            ? <Container>
                { messageEl }
            </Container>
            : <>{ messageEl }</>
    )
})

export default Message