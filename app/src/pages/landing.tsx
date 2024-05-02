import { Typography } from '@mui/material';
import copilot from '../assets/copilot.png';
import Grid from '@mui/material/Unstable_Grid2';
import GetStarted from '../components/landing/get-started';

export default function Landing() {
    return (
        <Grid container sx={{
            height: '80vh',
        }}>
            <Grid lg={6} sm={6} xs={12} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10
            }}>
                <div>
                    <Typography variant='h3' textAlign={'left'} sx={{
                        marginBottom: 10
                    }}>
                        Copilot Adoption Insights
                    </Typography>
                    <Typography variant='body1' sx={{
                        marginBottom: 2,
                        textAlign: 'justify'
                    }}>
                        Copilot Adoption Insights is a tool that helps you understand how GitHub Copilot is being adopted by your organization.
                    </Typography>
                    <Typography variant='body1' sx={{
                        textAlign: 'justify'
                    }}>
                        It provides insights on the usage of GitHub Copilot by your organization, including the number of suggestions accepted, the number of suggestions rejected, and the number of suggestions ignored.
                    </Typography>
                </div>
                <div>
                    <GetStarted />
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