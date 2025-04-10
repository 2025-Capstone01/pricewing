import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';

export default function Home(props) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <AppAppBar />
        </AppTheme>
    );
}
