import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 0,
        paddingBottom: 0,
        [theme.breakpoints.only('xs')]: {
            height: "calc(100% / 6)"
        },
        [theme.breakpoints.up('sm')]: {
            height: "calc(100% / 5)"
        }
    },
    listItemAvatar: {
        minWidth: "unset",
        height: "90%",
        aspectRatio: "1 / 1"
    },
    listItemText: {
        marginLeft: theme.spacing(2),
        '& .MuiListItemText-primary': {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }
    },
    selectButton: {
        padding: theme.spacing(1)
    },
    divider: {
        marginLeft: props => `${props.avatarWidth}px`
    }
}))