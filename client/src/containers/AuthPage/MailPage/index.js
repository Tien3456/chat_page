import React, { useEffect } from 'react'
import { 
    Grid, TextField, Button, Typography, Container, Box,
    Zoom, Fade,
    useTheme, useMediaQuery
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useStyles } from '../styles/index'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../redux/auth/actions'

const MailPage = () => {

    const classes = useStyles()
    const theme = useTheme()
    const isGreaterThanSm = useMediaQuery(theme.breakpoints.up('md'))
    const isLessThanSm = useMediaQuery(theme.breakpoints.only('xs'))
    const location = useLocation()
    const dispatch = useDispatch()

    const { isLoading, authMessages } = useSelector(state => state.auth)

    useEffect(() => {
        if(authMessages.length > 0) {
            dispatch(actions.doResetAuthMessages())
        }
    }, [])

    const handleKeyDown = e => {
        if(!e.keyCode || 
            (e.keyCode < 48 && e.keyCode !== 8 && e.keyCode !== 12 && e.keyCode !== 46) || 
            (e.keyCode > 57 && e.keyCode !== 8 && e.keyCode !== 12 && e.keyCode !== 46)) {
            e.preventDefault()
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const code = e.target['code'].value
        dispatch(actions.doVerifyMail({ code: code }))
    }

    const formWrapper = (
        <div className={ classes.formWrapper }>
            <Grid 
                container justifyContent="center" alignItems="center"
                className={ classes.avatarWrapper }
            >
                <Zoom in={ true } timeout={ 1000 }>
                    <img src="/images/avatar-img.png" className={ classes.avatar } />
                </Zoom>
            </Grid>
            <Typography 
                variant="h5" component="h1" align="center"
                className={ classes.title }
            >
                Welcome back
            </Typography>
            <Box mb={ 2 }>
                <Typography>Code has been send to { location.state.email }</Typography>
            </Box>
            <Fade in={ true } timeout={ 1500 } mountOnEnter unmountOnExit>
                <form className={ classes.form } onSubmit={ handleSubmit }>
                    <Box className={ classes.inputWrapper }>
                        <TextField 
                            type="text" name="code" required
                            variant="filled" label="Code"
                            className={ classes.textField }
                            onKeyDown={ handleKeyDown }
                        />
                        {
                            isGreaterThanSm &&
                            authMessages.length > 0 &&
                                <div className={ classes.alertWrapper }>
                                    <Alert severity="error">
                                        { authMessages[0].msg }
                                    </Alert>
                                </div>
                        }
                    </Box>
                    <Button 
                        type="submit"
                        variant="contained" color="primary"
                        className={ classes.button }
                        disabled={ isLoading }
                    >
                        <Grid container alignItems="center" justifyContent="center">
                            Verify
                            {
                                isLoading &&
                                    <div className={ classes.loading }>
                                    </div>
                            }
                        </Grid>
                    </Button>
                </form>
            </Fade>
            <Fade in={ true } timeout={ 1500 }>
                <div className={ classes.linkWrapper}>
                    <Typography align="center">Back to <Link to="/signup">sign up</Link></Typography>
                </div>
            </Fade>
            {
                isLessThanSm &&
                authMessages.length > 0 &&
                    <Fade in={ true } timeout={ 1500 }>
                        <Box mt={ 2 }>
                            <Typography align="center" color="secondary">{ authMessages[0].msg }</Typography>
                        </Box>
                    </Fade>
            }
        </div>
    )

    return (
        <Grid 
            container justifyContent="center" alignItems="center"
            className={ classes.root }
        >
            <Grid 
                container justifyContent="space-between" alignItems="center"
                className={ classes.bg }
            >
                {
                    isGreaterThanSm &&
                        <>
                            <div className={ classes.waveBg }></div>
                            <Zoom 
                                in={ true } timeout={ 1000 }
                                style={{
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <div className={ classes.mobileImgWrapper }>
                                    <Zoom in={ true } timeout={ 1000 }>
                                        <img src="/images/mobile-image.png" className={ classes.mobileImg } />
                                    </Zoom>
                                </div>
                            </Zoom>
                        </>
                }
                {
                    isLessThanSm
                        ? <Container>
                            { formWrapper }
                        </Container>
                        : <>
                            { formWrapper }
                        </>
                }
            </Grid>
        </Grid>
    )
}

export default MailPage