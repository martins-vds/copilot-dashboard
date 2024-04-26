import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainNav from "./main-nav";
import SideNav from "./side-nav";

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
            <SideNav />
            <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: '250px' } }}>
                <MainNav />
                <main>
                    <Container maxWidth="xl" sx={{ py: '64px' }}>
                        <Outlet />
                    </Container>
                </main>
            </Box>
        </Box>
    )
}