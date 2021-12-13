import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import SearchForm from './SearchForm'
import GroupNameField from './GroupNameField'
import SearchedUsersList from './SearchedUsersList'
import SelectedUsersList from './SelectedUsersList'
import { useNavigate } from '../../hooks/useNavigate'
import { useLocation, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.color.white.light,
        [theme.breakpoints.only('xs')]: {
            height: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "400px",
            height: "60%"
        }
    }
}))

const GroupCreator = () => {

    const history = useHistory()
    const location = useLocation()
    const theme = useTheme()
    const isGreaterThanXs = useMediaQuery(theme.breakpoints.up('sm'))
    const classes = useStyles()
    const limit = 20

    const [users, setUsers] = useState([])
    const [groupName, setGroupName] = useState('')

    const { navigateToGroupCreator } = useNavigate()

    useEffect(() => {
        if(isGreaterThanXs && location.pathname === '/group-creator') {
            const previousPath = location.state ? location.state.from : "/"
            history.push(previousPath)
        } else if(!isGreaterThanXs && location.pathname !== '/group-creator') {
            history.push('/group-creator')
        }
    }, [isGreaterThanXs])

    return (
        <Grid 
            container 
            direction="column"
            className={ classes.root }
            wrap="nowrap"
        >
            <SearchForm 
                limit={ limit }
                setUsers={ setUsers }
            />
            <GroupNameField 
                groupName={ groupName }
                setGroupName={ setGroupName }
            />
            <SearchedUsersList searchedUsers={ users } />
            <SelectedUsersList 
                groupName={ groupName }
                setUsers={ setUsers }
                setGroupName={ setGroupName }
            />
        </Grid>
    )
}

export default GroupCreator
