import React from 'react'
import { Avatar, Badge, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: props => ({
        width: props.width,
        height: props.height,
        objectFit: "cover"
    }),
    badge: props => ({
        '& .MuiBadge-anchorOriginBottomRightCircular': {
            transform: props.src 
                ? "scale(1.2) translate(50%, 50%)"
                : "scale(1.2) translate(0, 0)"
        },
        '& .MuiBadge-dot': {
            backgroundColor: "#31a24c"
        }
    })
}))

const CustomAvatar = React.memo(({ width, height, src, gender, isOnline }) => {

    const classes = useStyles({ width, height, src })

    return (
        <>
        {
            !isOnline
                ? <Avatar
                    src={
                        src
                            ? src
                            : (
                                gender === 'female'
                                    ? '/images/avatar-img.png'
                                    : '/images/male-avatar.png'
                            )
                    }
                    className={ classes.root }
                />
                : <Badge
                    overlap="circular"
                    variant="dot"
                    color="secondary"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    className={ classes.badge }
                >
                    <Avatar
                        src={
                            src
                                ? src
                                : (
                                    gender === 'female'
                                        ? '/images/avatar-img.png'
                                        : '/images/male-avatar.png'
                                )
                        }
                        className={ classes.root }
                    />
                </Badge>
        }
        </>
    )
})

export default CustomAvatar