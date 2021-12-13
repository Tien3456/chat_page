import React, { useEffect } from 'react'
import { 
    Grid, Box, Container, Typography,
    useTheme, useMediaQuery, makeStyles
} from '@material-ui/core'
import GroupIcon from '@material-ui/icons/Group'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Members from './Members'
import { useDispatch } from 'react-redux'
import { actions as modalActions } from '../../redux/modal/actions'
import { actions } from '../../redux/chat/actions'

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.color.white.main,
        [theme.breakpoints.only('xs')]: {
            height: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "350px",
            height: "60%"
        }
    },
    headingWrapper: {
        [theme.breakpoints.only('xs')]: {
            borderBottom: `1px solid ${theme.color.gray.light}`
        },
        [theme.breakpoints.up('sm')]: {
            background: theme.color.white.light,
            boxShadow: "0 3px 2px rgb(0 0 0 / 10%)",
            WebkitBoxShadow: "0 3px 2px rgb(0 0 0 / 10%)",
            MozBoxShadow: "0 3px 2px rgb(0 0 0 / 10%)"
        },
        '& h4': {
            fontSize: "20px",
            fontWeight: "bold"
        }
    }
}))

const MembersContainer = () => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()

    useEffect(() => {
        return () => dispatch(actions.doResetChatMembers())
    }, [])

    const headingEl = (
        <Grid 
            container
            alignItems="center"
            spacing={ 1 }
        >
            {
                isXs &&
                    <Grid 
                        item
                        onClick={() => dispatch(modalActions.doCloseModal())}
                    >
                        <ArrowBackIosIcon fontSize="small" />
                    </Grid>
            }
            <Grid item>
                <GroupIcon />
            </Grid>
            <Grid item>
                <Typography component="h4" variant="h5">
                    Members
                </Typography>
            </Grid>
        </Grid>
    )

    return (
        <Grid 
            container
            direction="column"
            wrap="nowrap"
            className={ classes.root }
        >
            <Box
                className={ classes.headingWrapper }
                sx={{
                    px: isXs ? 0 : 2,
                    py: 2
                }}
            >
                {
                    isXs
                        ? <Container>
                            { headingEl }
                        </Container>
                        : <>{ headingEl }</>
                }
            </Box>
            <Members />
        </Grid>
    )
}

export default MembersContainer
