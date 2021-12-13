import { makeStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

export const useStyles = makeStyles(theme => ({
    link: {
        display: "block",
        background: props => props.isActive ? grey[100] : "transparent",
        [theme.breakpoints.only('xs')]: {
            height: `calc(100% / 7)`
        },
        [theme.breakpoints.up('sm')]: {
            height: `calc(100% / 8)`
        },
        '& .MuiContainer-root': {
            height: "100%"
        },
    },
    listItem: {
        height: "100%",
        cursor: "pointer",
        [theme.breakpoints.only('xs')]: {
            paddingLeft: 0,
            paddingRight: 0
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    listItemAvatar: {
        marginRight: theme.spacing(1)
    },
    listItemText: {
        '& .MuiListItemText-primary': {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            '& .group-name': {
                fontWeight: "bold"
            }
        },
        '& .MuiListItemText-secondary': {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            '& .message-content': {
                maxWidth: "50%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
            }
        }
    },
    divider: {
        [theme.breakpoints.only('xs')]: {
            marginLeft: `calc(${theme.spacing(1)}px + 56px)`
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: `calc(${theme.spacing(3)}px + 56px)`
        }
    }
}))