import React, { useEffect } from 'react'
import { 
    Grid, Box, IconButton, 
    makeStyles, useTheme, useMediaQuery
} from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { useDispatch, useSelector } from 'react-redux'
import { actions as modalActions } from '../../redux/modal/actions'
import { actions } from '../../redux/file/actions'

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        background: "rgba(0, 0, 0, 0.7)",
        [theme.breakpoints.only('xs')]: {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: "80%"
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: "60%"
        }
    },
    file: {
        objectFit: "cover",
        maxWidth: "100%",
        [theme.breakpoints.only('xs')]: {
            width: "100%"
        }
    },
    closeButton: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
        padding: theme.spacing(1),
        zIndex: 9999
    }
}))

const File = () => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()

    const { type: fileType, src } = useSelector(state => state.file)

    useEffect(() => {
        return () => {
            dispatch(actions.doResetFileSrc())
        }
    }, [])

    return (
        <Box className={ classes.root }>
            {
                fileType === 'image' && src
                    ? <img className={ classes.file } src={ src } />
                    : <></>
            }
            {
                isXs &&
                    <IconButton 
                        className={ classes.closeButton } 
                        onClick={() => dispatch(modalActions.doCloseModal())}
                    >
                        <CloseRoundedIcon fontSize="small" style={{ color: "white" }} />
                    </IconButton>
            }
        </Box>
    )
}

export default File