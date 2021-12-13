import React, { useEffect, useState, useRef } from 'react'
import { 
    Grid, OutlinedInput, Box, IconButton, Container,
    useTheme, useMediaQuery
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined'
import ClearIcon from '@material-ui/icons/Clear'
import { useStyles } from './styles/ChatForm'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/chat/actions'

const ChatForm = () => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()
    const roomId = useParams().id
    const fileInputRef = useRef()

    const [textFieldValue, setTextFieldValue] = useState('')
    const [files, setFiles] = useState([])

    useEffect(() => {
        console.log(files)
    }, [files])

    const handleClickFileButton = () => fileInputRef.current?.click()

    const handleChangeField = e => setTextFieldValue(e.target.value)
    const handleChangeFile = e => {
        console.log(e.target.files)
        setFiles([...e.target.files])
    }

    const removeFile = (index) => {
        setFiles(prevFiles => {
            prevFiles.splice(index, 1)
            return [...prevFiles]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('textMessage', textFieldValue)
        
        if(files.length > 0) {
            files.slice(-10).forEach(file => {
                formData.append('files', file)
            })
        }

        setTextFieldValue('')
        setFiles([])

        dispatch(actions.doSendMessage(roomId, formData))
    }

    const formEl = (
        <form 
            encType="multipart/formData"
            className={ classes.form }
            onSubmit={ handleSubmit }
        >
            <Box className={ classes.textFieldWrapper }>
                <OutlinedInput
                    className={ classes.textField }
                    type="text" name="message" placeholder="Type message here..."
                    autoComplete="false"
                    onChange={ handleChangeField }
                    value={ textFieldValue }
                />
                <IconButton
                    className={`${classes.iconButton} file-input`}
                    onClick={ handleClickFileButton }
                >
                    <InsertPhotoOutlinedIcon color="primary" fontSize="small" />
                </IconButton>
                <IconButton 
                    type="submit"
                    className={`${classes.iconButton} submit-button`}
                    disabled={ files.length === 0 && textFieldValue.trim() === '' }
                >
                    <SendIcon 
                        color="primary" fontSize="small" 
                        className="send-icon"
                    />
                </IconButton>
            </Box>
            <Box sx={{ display: "none" }}>
                <input
                    ref={ fileInputRef }
                    type="file" name="files" multiple accept="image/*" 
                    onChange={ handleChangeFile }
                />
            </Box>
        </form>
    )

    const previewImagesEl = (
        <Grid 
            container
            alignItems="center"
            spacing={ 1 }
            className={ classes.previewImages }
        >
                {
                    files.map((file, i) => (
                        <Grid 
                            item key={ file.name }
                            className={ classes.previewImageWrapper }
                        >
                            <img 
                                width="56px" height="64px"
                                src={ URL.createObjectURL(file) } 
                            />
                            <IconButton 
                                className="clear-button"
                                onClick={() => removeFile(i)}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Grid>
                    ))
                }
        </Grid>
    )

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={ classes.root }
        >
            {
                isXs
                    ? <Container>
                        { formEl }
                    </Container>
                    : <>{ formEl }</>
            }
            {
                files.length > 0 &&
                    <>{ previewImagesEl }</>
            }
        </Grid>
    )
}

export default ChatForm