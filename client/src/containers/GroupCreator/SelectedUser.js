import React from 'react'
import { Grid, Box, Typography, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Avatar from '../../components/Avatar'
import { useStyles } from './styles/SelectedUser'

const SelectedUser = ({ avatarSrc, username, gender }) => {

    const classes = useStyles()

    return (
        <Grid 
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item>
                <Avatar
                    width={ 48 } height={ 48 }
                    src={ avatarSrc }
                    gender={ gender }
                />
            </Grid>
            <Grid item>
                <Typography 
                    component="span"
                    className={ classes.username }
                >
                    { username }
                </Typography>
            </Grid>
        </Grid>
    )
}

export default SelectedUser