import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        [theme.breakpoints.only('xs')]: {
            display: "none"
        }
    },
    img: {
        [theme.breakpoints.up('sm')]: {
            width: "80%"
        },
        [theme.breakpoints.up('md')]: {
            width: "70%"
        },
    }
}))

const Home = () => {

    const classes = useStyles()

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={ classes.root }
        >
            <img src="/images/home_2.png" className={ classes.img } />
        </Grid>
    )
}

export default Home