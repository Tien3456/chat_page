import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    root: {
        background: theme.color.white.light,
        [theme.breakpoints.only('xs')]: {
            position: "absolute",
            bottom: 0,
            left: 0,
            top: "unset",
            width: "100%",
            height: "10%"
        },
        [theme.breakpoints.up('sm')]: {
            position: "unset",
            height: "100%",
            width: "12%",
            padding: `${theme.spacing(3)}px 0`
        }
    },
    toolbar: {
        flexDirection: props => props.isXs ? "row" : "column",
        justifyContent: "space-between",
        height: "100%"
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "column",
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(1)
        }
    }
}))