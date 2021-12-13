import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    messageWrapper: {
        width: `calc(100% - 56px * 2 - ${theme.spacing(4)}px)`,
        '& p': {
            wordWrap: "break-word"
        }
    },
    textMessage: {
        maxWidth: "100%",
        background: props => props.userId !== props.message.sender._id
            ? "wheat" 
            : theme.palette.primary.main,
        color: props => props.userId !== props.message.sender._id 
            ? "rgba(0, 0, 0, 0.9)" 
            : "#fff",
        padding: theme.spacing(2),
        borderRadius: "8px"
    },
    filesMessage: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: props => props.message.files.length === 1
            ? "50%"
            : (
                props.message.files.length < 5 && props.message.files.length % 3 !== 0
                    ? `repeat(2, calc(50% - ${theme.spacing(2)}px))`
                    : `repeat(3, calc((100% - ${theme.spacing(4)}px) / 3))`
            ),
        justifyContent: props => props.userId !== props.message.sender._id
            ? "flex-start"
            : "flex-end",
        gap: theme.spacing(1),
        '& .img-wrapper': {
            aspectRatio: "1 / 1",
            cursor: "pointer"
        },
        '& img': {
            objectFit: "cover",
            width: "100%",
            height: "100%"
        }
    },
    timeMessage: {
        fontSize: "12px"
    }
}))