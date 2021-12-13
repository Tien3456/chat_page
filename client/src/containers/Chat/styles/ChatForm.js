import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        boxShadow: "0 -3px 3px rgb(0 0 0 / 12%)",
        WebkitBoxShadow: "0 -3px 3px rgb(0 0 0 / 12%)",
        MozBoxShadow: "0 -3px 3px rgb(0 0 0 / 12%)",
        [theme.breakpoints.only('xs')]: {
            height: "12%"
        },
        [theme.breakpoints.up('sm')]: {
            height: "10%",
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },
    },
    previewImages: {
        position: "absolute",
        left: 0,
        bottom: "100%",
        width: "100%",
        background: theme.color.white.main,
        zIndex: 1,
        padding: theme.spacing(2),
        '& img': {
            objectFit: "cover"
        }
    },
    previewImageWrapper: {
        position: "relative",
        '& .MuiIconButton-root': {
            '&.clear-button': {
                position: "absolute",
                right: 0,
                top: 0,
                width: "23px",
                height: "23px",
                transform: "translate(10px, -10px)",
                '&::before': {
                    position: "absolute",
                    content: "''",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "wheat",
                    opacity: 0.2,
                    borderRadius: "50%"
                },
                '& svg': {
                    fontSize: "16px"
                }
            }
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
            padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
            fontSize: "14px"
        }
    },
    iconButton: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        WebkitTransform: "translateY(-50%)",
        MozTransform: "translateY(-50%)",
        msTransform: "translateY(-50%)",
        oTransform: "translateY(-50%)",
        padding: theme.spacing(1),
        '&.submit-button': {
            right: theme.spacing(1),
            '&:disabled': {
                '& .send-icon': {
                    color: theme.color.gray.light
                }
            }
        },
        '&.file-input': {
            left: theme.spacing(1)
        }
    }
}))