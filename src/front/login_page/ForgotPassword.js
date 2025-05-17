//비밀보호 찾기
import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';

export default function ForgotPassword({ open, handleClose }) {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError(true);
            setHelperText('Please enter a valid email address.');
            return;
        }

        setError(false);
        setHelperText('');

        console.log('Reset password email:', email); // TODO: Replace with real API call
        handleClose(); // Close the dialog
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            component="form"
            onSubmit={handleSubmit}
        >
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    Enter your account’s email address, and we’ll send you a link to reset your password.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    fullWidth
                    id="reset-email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                    helperText={helperText}
                />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">Send</Button>
            </DialogActions>
        </Dialog>
    );
}

ForgotPassword.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};