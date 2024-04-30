import { Box, Typography } from '@mui/material';
import copilot from '../assets/copilot.png';
import { useGitHubAuth } from '../hooks/use-github-auth';

export default function Landing() {
    const { user, isLoggedIn } = useGitHubAuth();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

        }}>
            <Typography variant='h4'>Welcome to Copilot Insights</Typography>
            {user ? (<Typography variant='body1'>Welcome, {user.name}</Typography>) : null}
            <Typography variant='body1'>This app provides insights into your GitHub Copilot adotion</Typography>
            {isLoggedIn ? null : <Typography variant='body1'>Please login to continue</Typography>}
            <img src={copilot} alt="GitHub Copilot logo" style={
                {
                    width: '25%',
                    height: '25%',
                    margin: '1rem'
                }
            } />
        </Box>
    )
}