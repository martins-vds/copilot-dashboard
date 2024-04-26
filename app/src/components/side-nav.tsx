import { Box, Stack } from "@mui/material";

export default function SideNav() {
    return (
        <Box bgcolor={"blue"} sx={{            
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            height: '100%',
            left: 0,
            maxWidth: '100%',
            position: 'fixed',
            scrollbarWidth: 'none',
            top: 0,
            width: '250px',
            zIndex: 1100,
        }}>
            <Stack spacing={2} sx={{ p: 3 }}>
            </Stack>
        </Box>
    )
}