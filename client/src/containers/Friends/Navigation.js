import React from 'react'
import { 
    Grid, Button, Container, Box,
    useTheme, useMediaQuery
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { useStyles } from './styles/Navigation'

const Navigation = ({ isNavigatedToFriendsList, setNavigateToFriendsList }) => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()

    const navigationEl = (
        <Grid 
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={ 2 }
        >
            <Grid item xs={ 6 }>
                <Button 
                    variant="contained"
                    className={ 
                        isNavigatedToFriendsList
                            ? `${classes.navigateButton} active`
                            : classes.navigateButton
                    }
                    onClick={() => setNavigateToFriendsList(true)}
                >
                    <PersonIcon style={{ color: "#fff" }} />
                </Button>
            </Grid>
            <Grid item xs={ 6 }> 
                <Button 
                    variant="contained"
                    className={ 
                        isNavigatedToFriendsList
                            ? classes.navigateButton
                            : `${classes.navigateButton} active`
                    }
                    onClick={() => setNavigateToFriendsList(false)}
                >
                    <PersonAddIcon style={{ color: "#fff" }} />
                </Button>
            </Grid>
        </Grid>
    )

    return (
        <Grid 
            container 
            alignItems="center"
            className={ classes.root }
        >
            {
                isXs
                    ? <Container>
                        { navigationEl }
                    </Container>
                    : <>{ navigationEl }</>
            }
        </Grid>
    )
}

export default Navigation