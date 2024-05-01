import { Typography } from '@mui/material';
import copilot from '../assets/copilot.png';
import Grid from '@mui/material/Unstable_Grid2';

export default function Landing() {
    return (
        <Grid container sx={{
            height: '80vh',    
        }}>
            <Grid lg={6} sm={6} xs={12} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'            
            }}>
                <div>
                    <Typography variant='h4' textAlign={'left'} sx={{
                        marginBottom: 2
                    }}>Welcome to Copilot Insights</Typography>
                    <Typography variant='body1' sx={{
                        marginBottom: 2
                    }}>This app provides insights into your GitHub Copilot adotion</Typography>
                </div>
            </Grid>
            <Grid lg={6} sm={6} xs={12} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img src={copilot} alt="GitHub Copilot logo" style={
                    {
                        width: '80%'
                    }
                } />
            </Grid>
        </Grid>
    )
}