import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        background: "url('/images/undraw_Page_not_found_re_e9o6.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%"
    }
}))

const NotFoundPage = () => {

    const classes = useStyles()

    return (
        <Box className={ classes.root }>
        </Box>
    )
}

export default NotFoundPage
