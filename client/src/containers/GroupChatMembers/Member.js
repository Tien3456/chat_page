import React from 'react'
import { Box, useTheme, useMediaQuery } from '@material-ui/core'
import ListItem from '../../components/ListItem'
import Avatar from '../../components/Avatar'

const Member = React.memo(({ memberId, username, avatarSrc, gender, navigateToProfile }) => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))

    return (
        <Box 
            sx={{ height: isXs ? "calc(100% / 8)" : "calc(100% / 6)" }}
            onClick={ navigateToProfile }
        >
            <ListItem
                primary={ username }
                secondary={<></>}
                avatar={
                    <Avatar
                        width="100%" height="100%"
                        gender={ gender }
                        avatarSrc={ avatarSrc }
                    />
                }
                height="100%"
            />
        </Box>
    )
})

export default Member