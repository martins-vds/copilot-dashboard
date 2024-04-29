import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainNav from "./main-nav";

export default function Layout() {
    return (
        <Box
            sx={{                
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: '100%',
            }}
        >
            <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
                <MainNav />
                <main>
                    <Container maxWidth="lg">
                        <Outlet />
                    </Container>
                </main>
            </Box>
            
        </Box>
    )
}