import { Stack, Container, AppBar, Toolbar, Box, Button } from "@mui/material";
import GithubLoginButton from "./github-login-button";
import { useGitHubAuth } from "../store/reducer/use-github-auth";
import { useNavigate } from "react-router-dom";

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
                        {isLoggedIn && (<Box>
                            <Button variant="text" onClick={() => navigate('copilot-insights')}>
                                Copilot Insights
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