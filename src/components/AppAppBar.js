import * as React from 'react';
import {
    AppBar, Toolbar, Button, IconButton,
    Container, Drawer, MenuItem, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../services/session';
import { logout } from '../services/auth';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

export default function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(isLoggedIn());
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
        navigate('/');
    };

    const handleLogin = () => navigate('/sign-in');
    const handleSignup = () => navigate('/sign-up');

    return (
        <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ fontWeight: 'bold' }}></Box>

                    {/* 桌面端 */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {!loggedIn ? (
                            <>
                                <Button onClick={handleLogin} color="primary" variant="text" size="small">
                                    Sign in
                                </Button>
                                <Button onClick={handleSignup} color="primary" variant="contained" size="small">
                                    Sign up
                                </Button>
                            </>
                        ) : (
                            <Button onClick={handleLogout} variant="contained" color="error" size="small">
                                Logout
                            </Button>
                        )}
                    </Box>

                    {/* 移动端 */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>

                                {!loggedIn ? (
                                    <>
                                        <MenuItem>
                                            <Button onClick={() => { handleLogin(); setOpen(false); }} fullWidth variant="outlined">
                                                Sign in
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button onClick={() => { handleSignup(); setOpen(false); }} fullWidth variant="contained">
                                                Sign up
                                            </Button>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <MenuItem>
                                        <Button onClick={() => { handleLogout(); setOpen(false); }} fullWidth variant="contained" color="error">
                                            Logout
                                        </Button>
                                    </MenuItem>
                                )}
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
