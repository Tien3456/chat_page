import React, { useState, useEffect, useRef } from 'react'
import { 
    Grid, Box, Container, OutlinedInput, CircularProgress,
    useTheme, useMediaQuery
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { useStyles } from './styles/SearchForm'
import { useAsync } from '../../hooks/useAsync'
import { api } from '../../api/index'

const SearchForm = ({ limit, setUsers }) => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()
    const searchUsersAction = useRef()

    const [textFieldValue, setTextFieldValue] = useState('')

    const handleChange = e => setTextFieldValue(e.target.value)

    const searchUsers = useAsync(() => {
        const offset = 0
        return api.get(`/users/search?username=${textFieldValue}&offset=${offset}&limit=${limit}&onlyOtherUsers=${true}`)
    }, false)

    useEffect(() => {
        return () => {
            if(searchUsersAction.current) {
                clearTimeout(searchUsersAction.current)
            }
        }
    }, [])

    useEffect(() => {
        if(searchUsersAction.current) {
            clearTimeout(searchUsersAction.current)
        }
        searchUsersAction.current = setTimeout(() => {
            searchUsers.execute()
        }, 1000)
    }, [textFieldValue])

    useEffect(() => {
        if(searchUsers.value) {
            const { users } = searchUsers.value
            setUsers([...users])
        }
    }, [searchUsers.value])

    const formEl = (
        <form className={ classes.form }>
            <Box className={ classes.textFieldWrapper }>
                <OutlinedInput
                    className={ classes.textField }
                    type="text" name="username"
                    value={ textFieldValue }
                    onChange={ handleChange }
                />
                <Box color="text.disabled" className={ classes.iconWrapper }>
                    {
                        searchUsers.isLoading
                            ? <CircularProgress color="inherit" size={ 16 } />
                            : (
                                textFieldValue
                                    ? <CloseIcon 
                                        color="inherit" fontSize="small" 
                                        onClick={() => setTextFieldValue('')}
                                    />
                                    : <SearchIcon color="inherit" fontSize="small" />
                            )
                    }
                </Box>
            </Box>
        </form>
    )

    return (
        <Grid 
            container
            alignItems="center"
            justifyContent="center"
            className={ classes.root }
        >
            {
                isXs
                    ? <Container>
                        { formEl }
                    </Container>
                    : <>{ formEl }</>
            }
        </Grid>
    )
}

export default SearchForm
