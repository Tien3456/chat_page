import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: "0 4px 2px -2px rgb(0 0 0 / 12%)",
        WebkitBoxShadow: "0 4px 2px -2px rgb(0 0 0 / 12%)",
        MozBoxShadow: "0 4px 2px -2px rgb(0 0 0 / 12%)",
        [theme.breakpoints.only('xs')]: {
            background: theme.color.white.light,
            height: "12%"
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            height: "10%"
        }
    },
    backButton: {
        padding: theme.spacing(1),
    }
}))