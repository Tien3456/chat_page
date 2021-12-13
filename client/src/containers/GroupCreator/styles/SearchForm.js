import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.color.gray.light}`,
        [theme.breakpoints.only('xs')]: {
            // height: "72px"
            padding: `${theme.spacing(2)}px 0`
        },
        [theme.breakpoints.up('sm')]: {
            // height: "88px",
            padding: theme.spacing(2)
        }
    },
    form: {
        width: "100%"
    },
    textFieldWrapper: {
        position: "relative"
    },
    textField: {
        width: "100%",
        '& input': {
            width: "100%",
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        }
    },
    iconWrapper: {
        position: "absolute",
        right: theme.spacing(1),
        top: "50%",
        transform: "translateY(-50%)",
        WebkitTransform: "translateY(-50%)",
        MozTransform: "translateY(-50%)",
        msTransform: "translateY(-50%)",
        oTransform: "translateY(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))