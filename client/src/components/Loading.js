import React from 'react'
import { Box, LinearProgress } from '@material-ui/core'

const Loading = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 9999
            }}
        >
            <LinearProgress />
        </Box>
    )
}

export default Loading
