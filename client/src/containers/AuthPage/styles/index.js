import { makeStyles } from '@material-ui/core'
import { theme } from '../../../theme'

export const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: theme.palette.primary.light,
        overflow: "auto"
    },
    bg: {
        position: "relative",
        background: "white",
        width: "75vw",
        minHeight: "80vh",
        borderRadius: "20px",
        [theme.breakpoints.up('md')]: {
            overflow: "hidden"
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            minHeight: "100%",
            borderRadius: "unset",
            overflow: "auto"
        }
    },
    '@keyframes slide': {
        '0%': {
            transform: 'translateX(-105%)',
            WebkitTransform: 'translateX(-105%)',
            MozTransform: 'translateX(-105%)',
            MsTransform: 'translateX(-105%)',
            OTransform: 'translateX(-105%)'
        },
        '100%': {
            transform: 'translateX(0)',
            WebkitTransform: 'translateX(0)',
            MozTransform: 'translateX(0)',
            MsTransform: 'translateX(0)',
            OTransform: 'translateX(0)'
        }
    },
    waveBg: {
        position: "absolute",
        top: 0,
        left: 0,
        background: "url('/images/bg-auth-form.png')",
        backgroundSize: "cover",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        animation: '$slide 1s ease-out',
        WebkitAnimation: '$slide 1s ease-out',
        MozAnimation: '$slide 1s ease-out'
    },
    mobileImgWrapper: {
        position: "absolute",
        top: "50%",
        left: "25%",
        transform: "translate(-50%, -50%)",
        width: "50%"
    },
    mobileImg: {
        width: "100%",
        objectFit: "cover"
    },
    formWrapper: {
        position: "absolute",
        top: "50%",
        right: "25%",
        transform: "translate(50%, -50%)",
        width: "30%",
        [theme.breakpoints.down('sm')]: {
            right: "50%",
            width: "50%"
        },
        [theme.breakpoints.only('xs')]: {
            position: "unset",
            width: "100%",
            transform: "unset"
        }
    },
    avatarWrapper: {
        marginBottom: theme.spacing(2)
    },
    avatar: {
        width: "40%",
        objectFit: "cover"
    },
    title: {
        fontWeight: 600,
        marginBottom: theme.spacing(3),
        textTransform: "uppercase",
        fontFamily: "'Open Sans', sans-serif"
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    inputWrapper: {
        marginBottom: theme.spacing(2),
        position: "relative"
    },
    textField: {
        width: "100%",
        '& .MuiInputBase-root': {
            borderRadius: "5px",
            background: theme.color.gray.light
        },
        '& .MuiFilledInput-underline:before': {
            borderBottom: "none"
        },
        '& .MuiFilledInput-underline:after': {
            borderBottom: "none"
        },
        '& .MuiInputBase-root.Mui-focused': {
            border: `2px solid ${theme.palette.primary.main}`
        },
        '& .MuiFormLabel-asterisk': {
            display: "none"
        }
    },
    '@keyframes slideLeft': {
        '0%': {
            transform: "translateX(105%)",
            WebkitTransform: "translateX(105%)",
            MozTransform: "translateX(105%)",
            MsTransform: "translateX(105%)",
            OTransform: "translateX(105%)",
        },
        '100%': {
            transform: 'translateX(0)',
            WebkitTransform: 'translateX(0)',
            MozTransform: 'translateX(0)',
            MsTransform: 'translateX(0)',
            OTransform: 'translateX(0)'
        }
    },
    alertWrapper: {
        position: "absolute",
        right: `calc(100% + ${theme.spacing(2)}px)`,
        top: 0,
        height: "100%",
        minWidth: "100%",
        textAlign: "right",
        overflow: "hidden",
        '& > *': {
            display: "inline-flex",
            alignItems: "center",
            height: "100%",
            animation: '$slideLeft 0.5s ease-out',
            WebkitAnimation: '$slideLeft 0.5s ease-out',
            MozAnimation: '$slideLeft 0.5s ease-out',
            '& *': {
                whiteSpace: "nowrap"
            }
        }
    },
    formControl: {
        marginBottom: theme.spacing(2)
    },
    button: {
        borderRadius: "5px",
        marginBottom: theme.spacing(2),
        '&:disabled': {
            background: theme.palette.primary.main,
            color: "white"
        }
    },
    '@keyframes rotate': {
        '0%': {
            transform: 'rotate(0deg)',
            WebkitTransform: 'rotate(0deg)',
            MozTransform: 'rotate(0deg)',
            MsTransform: 'rotate(0deg)',
            OTransform: 'rotate(0deg)'
        },
        '50%': {
            transform: 'rotate(160deg)',
            WebkitTransform: 'rotate(160deg)',
            MozTransform: 'rotate(160deg)',
            MsTransform: 'rotate(160deg)',
            OTransform: 'rotate(160deg)'
        },
        '100%': {
            transform: 'rotate(360deg)',
            WebkitTransform: 'rotate(360deg)',
            MozTransform: 'rotate(360deg)',
            MsTransform: 'rotate(360deg)',
            OTransform: 'rotate(360deg)'
        }
    },
    loading: {
        background: "url('/images/fan.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "25px",
        height: "25px",
        marginLeft: theme.spacing(1),
        animation: '$rotate 0.3s ease-in-out infinite',
        WebkitAnimation: '$rotate 0.3s ease-in-out infinite',
        MozAnimation: '$rotate 0.3s ease-in-out infinite'
    }
}))