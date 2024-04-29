import { Stack, Avatar, Container, AppBar, Toolbar, Box } from "@mui/material";

export default function MainNav() {

    return (
        <Box sx={{
            marginBottom: 5,
        }}>
            <AppBar
                position="fixed"
                component="header"                
                variant="outlined"
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
                            <Avatar
                                src="/assets/avatar.png"
                                sx={{ cursor: 'pointer' }}
                            />
                        </Stack>
                    </Stack>
                </Container>
            </AppBar>
            <Toolbar />
        </Box>
    )
}