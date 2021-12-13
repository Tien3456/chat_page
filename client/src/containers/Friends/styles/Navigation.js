import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        height: "80px",
        [theme.breakpoints.only('xs')]: {
            borderBottom: `1px solid ${theme.color.gray.light}`
        },
        [theme.breakpoints.up('sm')]: {
            background: theme.color.white.light,
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            boxShadow: "0 3px 2px rgb(0 0 0 / 12%)",
            WebkitBoxShadow: "0 3px 2px rgb(0 0 0 / 12%)",
            MozBoxShadow: "0 3px 2px rgb(0 0 0 / 12%)"
        }
    },
    navigateButton: {
        width: "100%",
        background: theme.palette.primary.light,
        '&.active': {
            background: theme.palette.primary.main
        }
    }
}))