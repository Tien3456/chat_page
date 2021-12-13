import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        height: "10%",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },
        borderBottom: `1px solid ${theme.color.gray.light}`
    },
    form: {
        width: "100%"
    },
    textFieldWrapper: {
        position: "relative",
        '& > .icon-wrapper': {
            position: "absolute",
            top: "50%",
            right: theme.spacing(1),
            maxHeight: "20px",
            transform: "translateY(-50%)",
            WebkitTransform: "translateY(-50%)",
            MozTransform: "translateY(-50%)",
            msTransform: "translateY(-50%)",
            oTransform: "translateY(-50%)",
            '& .icon': {
                color: "inherit",
                fontSize: "20px",
                cursor: "pointer"
            }
        }
    },
    textField: {
        width: "100%",
        paddingRight: theme.spacing(4),
        '& input': {
            outline: 0,
            [theme.breakpoints.only('xs')]: {
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
                fontSize: "14px"
            },
            [theme.breakpoints.up('sm')]: {
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2)
            },
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${theme.palette.primary.main}`
        }
    },
    menuButton: {
        marginLeft: theme.spacing(1),
        [theme.breakpoints.only('xs')]: {
            padding: 0
        },
        [theme.breakpoints.up('sm')]: {
            width: "40px",
            height: "40px"
        }
    }
}))