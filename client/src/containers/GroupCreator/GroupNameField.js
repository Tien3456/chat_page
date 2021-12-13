import React from 'react'
import { 
    Box, Container, TextField, 
    makeStyles, useTheme, useMediaQuery
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.only('xs')]: {
            padding: `${theme.spacing(2)}px 0`
        },
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2)
        }
    },
    textField: {
        width: "100%",
        '& input': {
            width: "inherit"
        }
    }
}))

const GroupNameField = ({ groupName, setGroupName }) => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()

    const textFieldEl = (
        <TextField
            className={ classes.textField }
            type="text" name="groupName" placeholder="Type group name here..." 
            onChange={(e) => setGroupName(e.target.value)}
            value={ groupName }
        />
    )

    return (
        <Box className={ classes.root }>
            {
                isXs
                    ? <Container>
                        { textFieldEl }
                    </Container>
                    : <>{ textFieldEl }</>
            }
        </Box>
    )
}

export default GroupNameField
