import * as React from 'react';
import { Link as RouterLink, useNavigate  } from 'react-router-dom';
import {
    Box, Button, CssBaseline, Divider,
    FormControlLabel, FormLabel, FormControl, Link,
    TextField, Typography, Stack, Card as MuiCard, Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleIcon } from '../components/CustomIcons';
import { registerWithEmail, loginWithGoogle } from '../services/auth';

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

export default function SignUp() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const navigate = useNavigate();
    // const [nameError, setNameError] = React.useState(false);
    // const [nameErrorMessage, setNameErrorMessage] = React.useState('');

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        // const name = document.getElementById('name');
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

        // if (!name.value || name.value.length < 1) {
        //     setNameError(true);
        //     setNameErrorMessage('Name is required.');
        //     isValid = false;
        // } else {
        //     setNameError(false);
        //     setNameErrorMessage('');
        // }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const data = new FormData(e.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        try {
            await registerWithEmail(email, password);
            alert('Registration successful!');
            navigate('/');
        } catch (err) {
            alert('Register failed: ' + err.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            await loginWithGoogle();
            alert('Google sign up success!');
            navigate('/');
        } catch (err) {
            alert('Google sign up failed: ' + err.message);
        }
    };

    return (
        <>
            <CssBaseline />
            <Container>
                <Card>
                    <Typography component="h1" variant="h4">회원가입</Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/*    <FormControl>*/}
                    {/*        <FormLabel htmlFor="name">Full name</FormLabel>*/}
                    {/*        <TextField*/}
                    {/*            id="name"*/}
                    {/*            name="name"*/}
                    {/*            required*/}
                    {/*            fullWidth*/}
                    {/*            autoComplete="name"*/}
                    {/*            placeholder="Jon Snow"*/}
                    {/*            error={nameError}*/}
                    {/*            helperText={nameErrorMessage}*/}
                    {/*        />*/}
                    {/*    </FormControl>*/}

                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                id="email"
                                name="email"
                                required
                                fullWidth
                                autoComplete="email"
                                error={emailError}
                                helperText={emailErrorMessage}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                required
                                fullWidth
                                autoComplete="new-password"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                            />
                        </FormControl>

                        <FormControlLabel
                            control={<Checkbox />}
                            label="I want to receive updates via email."
                        />
                        <Button type="submit" fullWidth variant="contained">Sign up</Button>
                    </Box>

                    <Divider>or</Divider>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleRegister}
                        startIcon={<GoogleIcon />}
                    >
                        Sign up with Google
                    </Button>

                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        <Link component={RouterLink} to="/sign-in">
                            로그인
                        </Link>
                    </Typography>
                </Card>
            </Container>
        </>
    );
}
