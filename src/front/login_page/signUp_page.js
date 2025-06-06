//회원가입
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box, Button, CssBaseline, Divider,
    FormControlLabel, FormLabel, FormControl, Link,
    TextField, Typography, Stack, Card as MuiCard, Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { GoogleIcon } from './CustomIcons';
import { registerWithEmail, loginWithGoogle } from './auth';


const Card = styled(MuiCard)(({ theme }) => ({
    position: 'relative',
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

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('올바른 이메일 주소를 입력해주세요.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('비밀번호는 최소 6자 이상이어야 합니다.');
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
            await registerWithEmail(email, password);
            alert('회원가입이 완료되었습니다!');
            navigate('/');
        } catch (err) {
            alert('회원가입 실패: ' + err.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            await loginWithGoogle();
            alert('구글 회원가입 성공!');
            navigate('/');
        } catch (err) {
            alert('구글 회원가입 실패: ' + err.message);
        }
    };

    return (
        <>
            <CssBaseline />
            <Container>

                <Card>
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <IconButton onClick={() => navigate('/')}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography component="h1" variant="h4">회원가입</Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor="email">이메일</FormLabel>
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
                            <FormLabel htmlFor="password">비밀번호</FormLabel>
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
                            label="이메일 업데이트를 받고 싶습니다."
                        />
                        <Button type="submit" fullWidth variant="contained">회원가입</Button>
                    </Box>

                    <Divider>또는</Divider>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleRegister}
                        startIcon={<GoogleIcon />}
                    >
                        구글 계정으로 가입하기
                    </Button>

                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        이미 계정이 있으신가요?{' '}
                        <Link component={RouterLink} to="/login">
                            로그인
                        </Link>
                    </Typography>
                </Card>
            </Container>
        </>
    );
}