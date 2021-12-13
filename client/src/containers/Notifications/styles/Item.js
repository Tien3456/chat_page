import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    badge: {
        width: "100%",
        height: "100%"
    },
    username: {
        display: "block",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }
}))