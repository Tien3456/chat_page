import { Box, styled } from '@material-ui/core'

export const Row = styled(Box)({
    display: "flex",
    flexDirection: props => props.flexDirection || "row",
    alignItems: props => props.alignItems || "flex-start",
    justifyContent: props.justifyContent || "flex-start",
    flexWrap: props.flexWrap || "wrap"
})