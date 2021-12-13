import React, { Suspense, useEffect } from 'react'
import { 
    Modal, Box, CircularProgress,
    makeStyles, useTheme, useMediaQuery
} from '@material-ui/core'
import { children } from './children'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { actions } from '../../redux/modal/actions'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: props => props.childName === 'file' 
            ? "rgba(0, 0, 0, 0.8)" 
            : "rgba(0, 0, 0, 0.5)"
    }
}))

const ModalContainer = () => {

    const location = useLocation()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const dispatch = useDispatch()

    const { isOpen, child } = useSelector(state => state.modal)

    const currentChild = children.find(c => c.childName === child)

    const classes = useStyles({
        childName: currentChild?.childName
    })

    const Child = currentChild ? currentChild.component : <></>

    return (
        <Modal
            open={ isOpen }
            onClose={() => dispatch(actions.doCloseModal())}
            className={ classes.root }
        >
            {
                currentChild &&
                    <Suspense
                        fallback={
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <CircularProgress
                                    color="primary"
                                    size={ isXs ? 25 : 30 }
                                />
                            </Box>
                        }
                    >
                        <Child />
                    </Suspense>
            }
        </Modal>
    )
}

export default ModalContainer