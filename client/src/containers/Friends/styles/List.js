import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        height: "calc(100% - 80px)"
    },
    list: {
        width: "100%",
        height: "100%",
        overflow: "auto"
    }
}))