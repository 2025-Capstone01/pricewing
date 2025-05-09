import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box, Button, CssBaseline, Divider,
    FormControlLabel, FormLabel, FormControl, Link,
    TextField, Typography, Stack, Card as MuiCard, Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleIcon } from '../components/CustomIcons';
import ForgotPassword from '../components/ForgotPassword';
import { loginWithEmail, loginWithGoogle } from '../services/auth';



const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    maxWidth: 450,
}));

const Container = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(4),
    alignItems: 'center',
    justifyContent: 'center',
}));

export default function SignIn() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const data = new FormData(e.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        try {
            await loginWithEmail(email, password);
            alert('Login successful!');
            navigate('/');
        } catch (err) {
            alert('Login failed: ' + err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            alert('Google login success!');
            navigate('/');
        } catch (err) {
            alert('Google login failed: ' + err.message);
        }
    };

    return (
        <>
            <CssBaseline />
            <Container>
                <Card>
                    <Typography component="h1" variant="h4">로그인</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                name="email"
                                type="email"
                                autoFocus
                                required
                                fullWidth
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                id="password"
                                name="password"
                                type="password"
                                required
                                fullWidth
                            />
                        </FormControl>

                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained">Sign in</Button>

                        <Link component="button" onClick={handleClickOpen} sx={{ alignSelf: 'center' }}>
                            Forgot password?
                        </Link>
                    </Box>

                    <Divider>or</Divider>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleLogin}
                        startIcon={<GoogleIcon />}
                    >
                        Sign in with Google
                    </Button>

                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        Don&apos;t have an account?{' '}
                        <Link component={RouterLink} to="/sign-up">
                            sign up
                        </Link>

                    </Typography>
                </Card>

                <ForgotPassword open={open} handleClose={handleClose} />
            </Container>
        </>
    );
}
