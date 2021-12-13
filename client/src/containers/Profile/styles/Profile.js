import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        '& p.gender': {
            textTransform: "capitalize"
        }
    },
    avatarWrapper: {
        position: "relative",
        borderRadius: "50%"
    },
    loadingWrapper: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        WebkitTransform: "translate(-50%, -50%)",
        MozTransform: "translate(-50%, -50%)",
        msTransform: "translate(-50%, -50%)",
        oTransform: "translate(-50%, -50%)"
    },
    cameraIconWrapper: {
        padding: "5px",
        background: "rgba(255, 255, 255, 0.3)"
    },
    cameraIcon: {
        color: "rgba(0, 0, 0, 0.9)"
    }
}))