import React, { useState, useRef, useEffect } from 'react'
import { 
    IconButton, Typography,
} from '@material-ui/core'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import Avatar from '../../components/Avatar'
import ListItem from '../../components/ListItem'
import { useStyles } from './styles/SearchedUser'
import { useUpdateEffect } from '../../hooks/useUpdateEffect'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/chat/actions'

const SearchedUser = React.memo(({ _id, username, avatarSrc, gender }) => {

    const dispatch = useDispatch()
    const [isSelected, setSelect] = useState(false)

    const classes = useStyles()

    useUpdateEffect(() => {
        isSelected
            ? dispatch(actions.doAddSelectedUser({ _id, username, avatarSrc, gender }))
            : dispatch(actions.doRemoveSelectedUser(_id))
    }, [isSelected])

    const primaryEl = (
        <>
            <Typography component="span">
                { username }
            </Typography>
            <IconButton 
                className={ classes.selectButton }
                onClick={() => setSelect(isSelected => !isSelected)}
            >
                <RadioButtonCheckedIcon color={ isSelected ? "primary" : "inherit" } />
            </IconButton>
        </>
    )

    const secondaryEl = (
        <></>
    )

    return (
        <ListItem
            primary={ primaryEl }
            secondary={ secondaryEl }
            avatar={
                <Avatar
                    width="100%" height="100%"
                    avatarSrc={ avatarSrc }
                    gender={ gender }
                />
            }
            height="calc(100% / 6)"
        />
    )
})

export default SearchedUser
