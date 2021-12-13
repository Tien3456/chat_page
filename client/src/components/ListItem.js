import React, { useState, useEffect, useRef } from 'react'
import { 
    Box, ListItem, ListItemAvatar, ListItemText, Divider,
    makeStyles
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        height: props => props.height,
        width: "100%",
        background: props => props.isActive ? grey[100] : "transparent",
        cursor: "pointer",
        '&:hover': {
            background: grey[100]
        }
    },
    link: {
        textDecoration: "none",
        color: "unset",
        height: "100%",
        width: "100%"
    },
    listItem: {
        height: "100%",
        width: "100%",
        paddingTop: 0,
        paddingBottom: 0
    },
    listItemAvatar: {
        height: "80%",
        width: props => props.avatarWidth,
        minWidth: "unset"
    },
    listItemText: {
        marginLeft: theme.spacing(2),
        '& .MuiListItemText-primary, & .MuiListItemText-secondary': {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }
    },
    divider: {
        marginLeft: props => `${props.avatarWidth + theme.spacing(4)}px`
    }
}))
 
const CustomListItem = React.memo((props) => {

    const {
        primary,
        secondary,
        avatar,
        link,
        height,
        isActive
    } = props

    const avatarRef = useRef()
    
    const [avatarWidth, setAvatarWidth] = useState(0)

    const classes = useStyles({
        height,
        isActive,
        avatarWidth
    })

    useEffect(() => {
        const avatarHeight = avatarRef.current?.clientHeight
        setAvatarWidth(avatarHeight)
    }, [])

    const listItemEl = (
        <>
            <ListItem className={ classes.listItem }>
                <ListItemAvatar 
                    ref={ avatarRef }
                    className={ classes.listItemAvatar }
                >
                    { avatar }
                </ListItemAvatar>
                <ListItemText
                    className={ classes.listItemText }
                    primary={ primary }
                    secondary={ secondary }
                />
            </ListItem>
            <Divider 
                component="li" variant="inset" 
                className={ classes.divider }
            />
        </>
    )

    return (
        <Box className={ classes.root }>
            {
                link
                    ? <Link 
                        to={ link }
                        className={ classes.link }
                    >
                        { listItemEl }
                    </Link>
                    : <>{ listItemEl }</>
            }
        </Box>
    )
})

export default CustomListItem
