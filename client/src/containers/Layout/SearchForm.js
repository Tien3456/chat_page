import React, { useState, useRef, useEffect } from 'react'
import { 
    Box, Grid, OutlinedInput, Container, 
    IconButton, Menu, MenuItem, CircularProgress,
    useTheme, useMediaQuery
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import UsersList from './UsersList'
import { useStyles } from './styles/SearchForm'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateEffect } from '../../hooks/useUpdateEffect'
import { useNavigate } from '../../hooks/useNavigate'
import { actions } from '../../redux/users/actions'

const SearchForm = () => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()
    const limit = 20
    const searchUsers = useRef()

    const [textFieldValue, setTextFieldValue] = useState('')
    const [onlyOtherUsers, setOnlyOtherUsers] = useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const open = Boolean(menuAnchorEl)

    const { searchedUsers } = useSelector(state => state.users)

    const handleClick = e => setMenuAnchorEl(e.currentTarget)
    const handleClose = () => setMenuAnchorEl(null)

    const handleChangeField = e => setTextFieldValue(e.target.value)

    const handleClickDirectButton = () => {
        setTextFieldValue('')
        setOnlyOtherUsers(true)
    }

    const { navigateToGroupCreator } = useNavigate()

    useEffect(() => {
        return () => {
            if(searchUsers.current) {
                clearTimeout(searchUsers.current)
            }
        }
    }, [])

    useUpdateEffect(() => {
        if(searchUsers.current) {
            clearTimeout(searchUsers.current)
        }
        searchUsers.current = setTimeout(() => {
            const offset = 0
            if(searchedUsers.list.length > 0) {
                dispatch(actions.doResetSearchedUsers())
            }
            dispatch(actions.doSearchUsers(textFieldValue, offset, limit, onlyOtherUsers))
        }, 1000)
    }, [textFieldValue])
      
    const formEl = (
        <Box 
            sx={{ 
                display: "flex",
                alignItems: "center",
                width: "100%"
            }}
        >
            <form className={ classes.form } >
                <Box className={ classes.textFieldWrapper }>
                    <OutlinedInput
                        inputRef={(input) => input !== null && onlyOtherUsers && input.focus()}
                        className={ classes.textField }
                        type="text" name="username" placeholder="Type username here..."
                        value={ textFieldValue }
                        onChange={ handleChangeField }
                    />
                    <Box 
                        color="text.disabled"
                        className="icon-wrapper"
                    >
                        {
                            searchedUsers.isLoading
                                ? <CircularProgress size={ 16 } color="inherit" />
                                : (
                                    textFieldValue
                                        ? <ClearIcon 
                                            className="icon" 
                                            onClick={() => setTextFieldValue('')}
                                        />
                                        : <SearchIcon className="icon" />
                                )
                        }
                    </Box>
                </Box>
            </form>
            <Box>
                <IconButton
                    className={ classes.menuButton }
                    id="direct-chat-button"
                    aria-controls="chat-menu"
                    aria-haspopup="true"
                    onClick={ handleClick }
                >
                    <AddIcon />
                </IconButton>
                <Menu
                    id="chat-menu"
                    anchorEl={ menuAnchorEl }
                    open={ open }
                    MenuListProps={{
                        'aria-labelledby': 'direct-chat-button',
                    }}
                    onClose={ handleClose }
                >
                    <MenuItem 
                        onClick={() => {
                            handleClickDirectButton()
                            handleClose()
                        }}
                    >
                        Direct
                    </MenuItem>
                    <MenuItem 
                        onClick={() => {
                            handleClose()
                            navigateToGroupCreator()
                        }}
                    >
                        Create group
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    )

    return (
        <Grid 
            container
            className={ classes.root }
            justifyContent="center"
            alignItems="center"
        >
            {
                isXs
                    ? <Container>
                        { formEl }
                    </Container>
                    : <>{ formEl }</>
            }
            <UsersList 
                username={ textFieldValue }
                limit={ limit } 
                onlyOtherUsers={ onlyOtherUsers }
            />
        </Grid>
    )
}

export default SearchForm