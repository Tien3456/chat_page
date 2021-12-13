import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        padding: `${theme.spacing(1)}px 0`
    },
    buttonWrapper: {
        position: "relative"
    },
    contactButton: {
        '&.MuiButton-root': {
            backgroundSize: "205% 100% !important",
            backgroundPositionX: "left",
            textTransform: "capitalize",
            transition: "all 0.3s ease-out",
            WebkitTransition: "all 0.3s ease-out",
            MozTransition: "all 0.3s ease-out",
            msTransition: "all 0.3s ease-out",
            oTransition: "all 0.3s ease-out",
            '&.left-button': {
                background: `linear-gradient(to right, ${theme.color.white.light} 50%, ${theme.palette.primary.main} 50%)`,
                border: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                '&:hover': {
                    color: theme.color.white.light
                }
            },
            '&.right-button': {
                background: `linear-gradient(to right, ${theme.palette.primary.main} 50%, ${theme.color.white.light} 50%)`,
                border: `1px solid ${theme.palette.primary.main}`,
                color: theme.color.white.light,
                overflow: "hidden",
                '&:hover': {
                    color: theme.palette.primary.main
                }
            },
            '&:hover': {
                backgroundPositionX: "right"
            }
        }
    },
    loadingWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.6)",
        zIndex: 1,
        display: props => props.isHandling ? "flex" : "none"
    }
}))