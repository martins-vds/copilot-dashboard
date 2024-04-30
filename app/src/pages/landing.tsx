import { Box, Typography } from '@mui/material';
import copilot from '../assets/copilot.png';

export default function Landing(){
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        
        }}>
            <Typography variant='h2'>Welcome to Copilot Insights</Typography>
            <Typography variant='body1'>Sign in with GitHub to get started</Typography>
            <img src={copilot} alt="GitHub Copilot logo" />
        </Box>
    )
}