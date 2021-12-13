import React from 'react'
import { Box, Badge, makeStyles } from '@material-ui/core'
import Avatar from './Avatar'

const useStyles = makeStyles(theme => ({
    root: props => ({
        position: "relative",
        width: props.width,
        height: props.height
    }),
    leftAvatarWrapper: {
        position: "absolute",
        top: 0,
        left: 0
    },
    rightAvatarWrapper: props => ({
        position: "absolute",
        top: 0,
        right: 0,
        borderRadius: "50%",
        background: "white",
        padding: props.padding,
        transform: "translateY(50%)",
        zIndex: 1
    }),
    badge: props => ({
        '& .MuiBadge-anchorOriginBottomRightCircular': {
            transform: "scale(1.2) translate(50%, 50%)"
        },
        '& .MuiBadge-dot': {
            backgroundColor: "#31a24c"
        }
    })
}))

const CustomAvatarGroup = ({ width, height, members }) => {

    const classes = useStyles({ 
        width: `${width}px`, 
        height: `${height}px`,
        padding: members[1] && members[1]?.avatarSrc ? "2px" : "0px",
        rightAvatarSrc: members[1]?.avatarSrc
    })

    return (
        <>
        {
            members[0]?.isOnline || members[1]?.isOnline
                ? <Badge
                    overlap="circular"
                    variant="dot"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    className={ classes.badge }
                >
                    <Box className={ classes.root }>
                        <Box className={ classes.leftAvatarWrapper }>
                            <Avatar
                                width={`${width / 3 * 2}px`} height={`${height / 3 * 2}px`}
                                src={ members[0]?.avatarSrc }
                                gender={ members[0]?.gender }
                            />
                        </Box>
                        <Box className={ classes.rightAvatarWrapper }>
                            <Avatar
                                width={`${width / 3 * 2}px`} height={`${height / 3 * 2}px`}
                                src={ members[1]?.avatarSrc }
                                gender={ members[1]?.gender }
                            />
                        </Box>
                    </Box>
                </Badge>
                : <Box className={ classes.root }>
                    <Box className={ classes.leftAvatarWrapper }>
                        <Avatar
                            width={`${width / 3 * 2}px`} height={`${height / 3 * 2}px`}
                            src={ members[0]?.avatarSrc }
                            gender={ members[0]?.gender }
                        />
                    </Box>
                    <Box className={ classes.rightAvatarWrapper }>
                        <Avatar
                            width={`${width / 3 * 2}px`} height={`${height / 3 * 2}px`}
                            src={ members[1]?.avatarSrc }
                            gender={ members[1]?.gender }
                        />
                    </Box>
                </Box>
        }
        </>
    )
}

export default CustomAvatarGroup
