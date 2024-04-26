import { Box, Stack, IconButton, Tooltip, Avatar } from "@mui/material";
import React, { useState } from "react";
import { MobileNav } from "./mobile-nav";

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function MainNav() {
    const [openNav, setOpenNav] = useState<boolean>(false);

    return (
        <React.Fragment>
            <Box
                component="header"
                sx={{
                    borderBottom: '1px solid var(--mui-palette-divider)',
                    backgroundColor: 'var(--mui-palette-background-paper)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
                >
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <IconButton
                            onClick={(): void => {
                                setOpenNav(true);
                            }}
                            sx={{ display: { lg: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Tooltip title="Search">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <Avatar
                            src="/assets/avatar.png"
                            sx={{ cursor: 'pointer' }}
                        />
                    </Stack>
                </Stack>
            </Box>
            <MobileNav
                onClose={() => {
                    setOpenNav(false);
                }}
                open={openNav}
            />
        </React.Fragment>
    )
}