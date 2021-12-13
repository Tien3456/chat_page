import React from 'react'
import SearchedUser from './SearchedUser'
import { Grid, List, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        [theme.breakpoints.only('xs')]: {
            // height: `calc(100% - 72px * 2)`
        },
        [theme.breakpoints.up('sm')]: {
            // height: `calc(100% - 88px * 2)`
        }
    },
    list: {
        padding: 0,
        overflow: "auto",
        height: "100%",
        width: "100%"
    }
}))

const SearchedUsersList = ({ searchedUsers }) => {

    const classes = useStyles()

    return (
        <Grid container className={ classes.root }>
            <List className={ classes.list }>
                {
                    searchedUsers.length > 0 &&
                    searchedUsers.map(user => (
                        <SearchedUser
                            key={ `group-searched-user${user._id}` }
                            {...user}
                        />
                    ))
                }
            </List>
        </Grid>
    )
}

export default SearchedUsersList
