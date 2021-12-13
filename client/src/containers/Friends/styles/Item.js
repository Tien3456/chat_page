import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    listItem: {
        height: "calc(100% / 6)",
        cursor: "pointer"
    },
    listItemText: {
        marginLeft: theme.spacing(2),
        '& .MuiListItemText-primary': {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }
    },
    divider: {
        marginLeft: `calc(56px + ${theme.spacing(4)}px)`
    },
    loadingWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.4)",
        zIndex: 1
    },
    acceptButton: {
        textTransform: "capitalize"
    }
}))