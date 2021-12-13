import React, { useRef } from 'react'
import { 
    Grid, Box, Container, Typography, Badge, IconButton, CircularProgress,
    useTheme, useMediaQuery
} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import PersonIcon from '@material-ui/icons/Person'
import GitHubIcon from '@material-ui/icons/GitHub'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import Avatar from '../../components/Avatar'
import { useStyles } from './styles/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/users/actions'

const Info = ({ text, icon: Icon }) => {
    return (
        <Grid container spacing={ 1 }>
            <Grid item>
                <Icon />
            </Grid>
            <Grid item>
                <Typography
                    className={
                        text === 'female' || text === 'male'
                            ? "text gender"
                            : "text"
                    }
                >
                    { text }
                </Typography>
            </Grid>
        </Grid>
    )
}

const Profile = () => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()
    const fileInputRef = useRef()
    const submitInputRef = useRef()

    const { currentUser } = useSelector(state => state.users)
    const { isContact, _id, email, username, avatarSrc, gender } = currentUser.info

    const handleSubmitFileForm = e => {
        e.preventDefault()
        const formData = new FormData()
        if(fileInputRef.current?.files && !isContact) {
            formData.append('avatar', fileInputRef.current?.files[0])
            dispatch(actions.doUploadAvatar(_id, formData))
        }
    }

    return (
        <Grid 
            container
            alignItems="center"
            direction="column"
            className={ classes.root }
        >
            <Box 
                sx={{ mb: 2 }} 
                className={ classes.avatarWrapper }
            >
                {
                    !isContact
                        ? <>
                            <Badge
                                overlap="circular"
                                badgeContent={
                                    <IconButton 
                                        className={ classes.cameraIconWrapper }
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <CameraAltIcon 
                                            fontSize="small"
                                            className={ classes.cameraIcon }
                                        />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    width={ 104 } height={ 104 }
                                    src={ avatarSrc }
                                    gender={ gender }
                                />
                            </Badge>
                            <Box sx={{ display: "none" }}>
                                <form 
                                    encType="multipart/formData"
                                    onSubmit={ handleSubmitFileForm }
                                >
                                    <input 
                                        type="file" name="image" ref={ fileInputRef } 
                                        accept="image/*"
                                        onChange={() => submitInputRef.current?.click()}
                                    />
                                    <input type="submit" value="Submit" ref={ submitInputRef } />
                                </form>
                            </Box>
                            {
                                currentUser.isUploading &&
                                    <Box className={ classes.loadingWrapper }>
                                        <CircularProgress 
                                            color="inherit"
                                            size={ isXs ? 18 : 23 }
                                        />
                                    </Box>
                            }
                        </>
                        : <Avatar
                            width={ 104 } height={ 104 }
                            src={ avatarSrc }
                            gender={ gender }
                        />
                }
            </Box>
            {
                isXs
                    ? <Container>
                        <Info
                            text={ email }
                            icon={ EmailIcon }
                        />
                    </Container>
                    : <Info
                        text={ email }
                        icon={ EmailIcon }
                    />
            }
            {
                isXs
                    ? <Container>
                        <Info
                            text={ username }
                            icon={ PersonIcon }
                        />
                    </Container>
                    : <Info
                        text={ username }
                        icon={ PersonIcon }
                    />
            }
            {
                isXs
                    ? <Container>
                        <Info
                            text={ gender }
                            icon={ GitHubIcon }
                        />
                    </Container>
                    : <Info
                        text={ gender }
                        icon={ GitHubIcon }
                    />
            }
        </Grid>
    )
}

export default Profile
