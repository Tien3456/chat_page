import React, { useEffect } from 'react'
import { 
    Grid, Container, Box, IconButton,
    makeStyles, useTheme, useMediaQuery
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SelectedUser from './SelectedUser'
import { actions } from '../../redux/chat/actions'
import { actions as modalActions } from '../../redux/modal/actions'

const useStyles = makeStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.color.gray.light}`,
        [theme.breakpoints.only('xs')]: {
            height: "72px"
        },
        [theme.breakpoints.up('sm')]: {
            height: "88px",
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    listWrapper: {
        position: "relative"
    },
    list: {
        overflowX: "auto",
        width: `calc(100% - 48px)`
    },
    sendButton: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        WebkitTransform: "translateY(-50%)",
        Mozransform: "translateY(-50%)",
        msTransform: "translateY(-50%)",
        oTransform: "translateY(-50%)",
        width: "48px",
        [theme.breakpoints.only('xs')]: {
            right: 0
        },
        [theme.breakpoints.up('sm')]: {
            right: theme.spacing(2)
        }
    }
}))

const SelectedUsersList = ({ groupName, setGroupName, setUsers }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()

    const { groupCreator } = useSelector(state => state.chat)

    useEffect(() => {
        return () => dispatch(actions.doResetSelectedUsers())
    }, [])

    const createGroup = () => {
        const memberIds = groupCreator.selectedUsers.map(user => user._id)
        const isGroup = true
        dispatch(actions.doCreateGroup(memberIds, history, groupName, isGroup))
        dispatch(modalActions.doCloseModal())
    }

    const listEl = (
        <Grid 
            container
            spacing={ 1 }
            wrap="nowrap"
            className={ classes.list }
        >
            {
                groupCreator.selectedUsers.length > 0 &&
                groupCreator.selectedUsers.map(user => (
                    <Grid 
                        item 
                        key={ `group-selected-user${user._id}` }
                    >
                        <SelectedUser {...user} />
                    </Grid>
                ))
            }
        </Grid>
    )

    return (
        <Grid 
            className={ classes.root }
            container
            alignItems="center"
        >
            {
                isXs
                    ? <Container>
                        <Grid 
                            container
                            alignItems="center"
                            className={ classes.listWrapper }
                        >
                            { listEl }
                            <IconButton 
                                className={ classes.sendButton }
                                disabled={ groupCreator.selectedUsers.length < 2 }
                            >
                                <SendIcon />
                            </IconButton>
                        </Grid>
                    </Container>
                    : <Grid 
                        container
                        alignItems="center"
                        className={ classes.listWrapper }
                    >
                        { listEl }
                        <IconButton 
                            className={ classes.sendButton }
                            onClick={ createGroup }
                            disabled={ 
                                groupCreator.selectedUsers.length < 2 ||
                                groupName.trim() === '' ||
                                groupName.length < 3 ||
                                groupCreator.isCreating
                            }
                        >
                            <SendIcon
                                color={ 
                                    groupCreator.selectedUsers.length >= 2 && 
                                    groupName.trim() !== '' &&
                                    groupName.length >= 3
                                        ? "primary"
                                        : "inherit"
                                }
                            />
                        </IconButton>
                    </Grid>
            }
        </Grid>
    )
}

export default SelectedUsersList
