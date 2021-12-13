import React, { useEffect, useRef } from 'react'
import { 
    Grid, TextField, Button, Typography, Container, Box,
    Zoom, Fade,
    useTheme, useMediaQuery
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useStyles } from '../styles/index'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../redux/auth/actions'

const SignInPage = () => {

    const classes = useStyles()
    const theme = useTheme()
    const isGreaterThanSm = useMediaQuery(theme.breakpoints.up('md'))
    const isLessThanSm = useMediaQuery(theme.breakpoints.only('xs'))
    const dispatch = useDispatch()

    const { isLoading, authMessages } = useSelector(state => state.auth)

    const getAuthMsg = param => {
        return authMessages.find(authMsg => authMsg.param === param)
    }

    useEffect(() => {
        if(authMessages?.length > 0) {
            dispatch(actions.doResetAuthMessages())
        }
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const userInfo = {
            email: e.target['email'].value,
            pass: e.target['pass'].value
        }
        dispatch(actions.doSignIn(userInfo))
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
            <Fade in={ true } timeout={ 1500 } mountOnEnter unmountOnExit>
                <form className={ classes.form } onSubmit={ handleSubmit }>
                    <Box className={ classes.inputWrapper }>
                        <TextField 
                            type="email" name="email" required
                            variant="filled" label="Email"
                            className={ classes.textField }
                        />
                        {
                            isGreaterThanSm &&
                            authMessages?.length > 0 &&
                            getAuthMsg('email') &&
                                <div className={ classes.alertWrapper }>
                                    <Alert severity="error">
                                        { getAuthMsg('email').msg }
                                    </Alert>
                                </div>
                        }
                    </Box>
                    <Box className={ classes.inputWrapper }>
                        <TextField 
                            type="password" name="pass" required
                            variant="filled" label="Password"
                            className={ classes.textField }
                        />
                        {
                            isGreaterThanSm &&
                            authMessages?.length > 0 &&
                            getAuthMsg('pass') &&
                                <div className={ classes.alertWrapper }>
                                    <Alert severity="error">
                                        { getAuthMsg('pass').msg }
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
                            Sign in
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
                    <Typography align="center">Don't have account, <Link to="/signup">sign up</Link></Typography>
                </div>
            </Fade>
            {
                isLessThanSm &&
                authMessages?.length > 0 &&
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
                            
                                <div className={ classes.mobileImgWrapper }>
                                    <Zoom in={ true } timeout={ 1000 }>
                                        <img src="/images/mobile-image.png" className={ classes.mobileImg } />
                                    </Zoom>
                                </div>
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

export default SignInPage