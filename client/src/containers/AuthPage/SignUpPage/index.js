import React, { useState, useEffect } from 'react'
import { 
    Grid, TextField, Button, Typography, Container, Box,
    FormControl, FormLabel, FormControlLabel, RadioGroup, Radio,
    Zoom, Fade,
    useTheme, useMediaQuery
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useStyles } from '../styles/index'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { actions } from '../../../redux/auth/actions'

const SignUpPage = () => {

    const classes = useStyles()
    const theme = useTheme()
    const isGreaterThanSm = useMediaQuery(theme.breakpoints.up('md'))
    const isLessThanSm = useMediaQuery(theme.breakpoints.only('xs'))
    const history = useHistory()
    const dispatch = useDispatch()

    const [gender, setGender] = useState('female')
    const { isLoading, authMessages } = useSelector(state => state.auth)

    const getAuthMsg = param => {
        return authMessages.find(authMsg => authMsg.param === param)
    }

    useEffect(() => {
        if(authMessages.length > 0) {
            dispatch(actions.doResetAuthMessages())
        }
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const userInfo = {
            email: e.target['email'].value,
            username: e.target['username'].value,
            pass: e.target['pass'].value,
            gender
        }
        dispatch(actions.doSignUp(userInfo, history))
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
                            authMessages.length > 0 &&
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
                            type="text" name="username" required
                            variant="filled" label="Username"
                            className={ classes.textField }
                        />
                        {
                            isGreaterThanSm &&
                            authMessages.length > 0 &&
                            getAuthMsg('username') &&
                                <div className={ classes.alertWrapper }>
                                    <Alert severity="error">
                                        { getAuthMsg('username').msg }
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
                            authMessages.length > 0 &&
                            getAuthMsg('pass') &&
                                <div className={ classes.alertWrapper }>
                                    <Alert severity="error">
                                        { getAuthMsg('pass').msg }
                                    </Alert>
                                </div>
                        }
                    </Box>
                    <FormControl component="fieldset" className={ classes.formControl }>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={gender} row>
                            <FormControlLabel 
                                value="female" control={<Radio color="primary" />} label="Female" 
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <FormControlLabel 
                                value="male" control={<Radio color="primary" />} label="Male" 
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </RadioGroup>
                    </FormControl>
                    <Button 
                        type="submit"
                        variant="contained" color="primary"
                        className={ classes.button }
                        disabled={ isLoading }
                    >
                        <Grid container alignItems="center" justifyContent="center">
                            Sign up
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
                    <Typography align="center">If you have an account, <Link to="/signin">sign in</Link></Typography>
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

export default SignUpPage