import { Stack, Container, AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import GithubLoginButton from "./github-login-button";
import { useGitHubAuth } from "../hooks/use-github-auth";
import { useNavigate } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function MainNav() {
    const { isLoggedIn } = useGitHubAuth();

    const navigate = useNavigate();

    return (
        <Box sx={{
            marginBottom: 5,
        }}>
            <AppBar
                position="fixed"
                component="header"
                variant="outlined"
                color="default"
            >
                <Container maxWidth={"lg"}>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
                    >
                        <IconButton onClick={() => navigate('/')}>
                            <GitHubIcon fontSize="large"/>
                        </IconButton>
                        {isLoggedIn && (<Box>
                            <Button variant="text" onClick={() => navigate('dashboard')}>
                                Dashboard
                            </Button>
                        </Box>)}
                        <Box sx={{
                            flexGrow: 1,
                        }}></Box>
                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                            <GithubLoginButton />
                        </Stack>
                    </Stack>
                </Container>
            </AppBar>
            <Toolbar />
        </Box>
    )
}