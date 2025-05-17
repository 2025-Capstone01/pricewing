//로그인
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
import ForgotPassword from './ForgotPassword';
import { loginWithEmail, loginWithGoogle } from './auth';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../firebase';


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

export default function SignIn() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    // React.useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             localStorage.setItem('user', JSON.stringify(user));
    //             navigate('/');
    //         }
    //     });
    //
    //     return () => unsubscribe();
    // }, [navigate]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            // Firebase 로그인
            await loginWithEmail(email, password);

            // MySQL에서 user_id 조회
            const res = await fetch(`http://localhost:5050/api/users/id?email=${email}`);
            const result = await res.json();

            if (!result.user_id) {
                alert('user_id 조회 실패');
                return;
            }

            // user_id를 localStorage에 저장
            localStorage.setItem('user_id', result.user_id);
            alert('로그인 성공!');
            navigate('/');
        } catch (err) {
            alert('로그인 실패: ' + err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // Firebase 로그인 (구글 팝업)
            const user = await loginWithGoogle();

            // MySQL에 사용자 정보 저장 (이미 있으면 무시됨)
            const res = await fetch("http://localhost:5050/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email, password: "" }) // 구글은 비밀번호 없음
            });

            const result = await res.json();

            // user_id 저장
            if (result.user_id) {
                localStorage.setItem("user_id", result.user_id);
            } else {
                // 이미 등록된 사용자라면 user_id만 별도로 조회
                const idRes = await fetch(`http://localhost:5050/api/users/id?email=${user.email}`);
                const idResult = await idRes.json();

                if (idResult.user_id) {
                    localStorage.setItem("user_id", idResult.user_id);
                } else {
                    alert("user_id 조회 실패");
                    return;
                }
            }
            alert('구글 로그인 성공!');
            navigate('/');
        } catch (err) {
            alert('구글 로그인 실패: ' + err.message);
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
                    <Typography component="h1" variant="h4">로그인</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor="email">이메일</FormLabel>
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
                            <FormLabel htmlFor="password">비밀번호</FormLabel>
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

                        <FormControlLabel control={<Checkbox />} label="이메일 업데이트를 받고 싶습니다." />
                        <Button type="submit" fullWidth variant="contained">로그인</Button>

                        <Link component="button" onClick={handleClickOpen} sx={{ alignSelf: 'center' }}>
                            비밀번호를 잊으셨나요?
                        </Link>
                    </Box>

                    <Divider>또는</Divider>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleLogin}
                        startIcon={<GoogleIcon />}
                    >
                        구글 계정으로 로그인
                    </Button>

                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        계정이 없으신가요?{' '}
                        <Link component={RouterLink} to="/signUp">
                            회원가입
                        </Link>
                    </Typography>
                </Card>

                <ForgotPassword open={open} handleClose={handleClose} />
            </Container>
        </>
    );
}