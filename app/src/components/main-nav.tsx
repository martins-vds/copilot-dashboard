import { Stack, Container, AppBar, Toolbar, Box } from "@mui/material";
import GithubLoginButton from "./github-login-button";

export default function MainNav() {

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