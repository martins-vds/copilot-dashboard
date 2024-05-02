import { useGitHubAuth } from "../hooks/use-github-auth";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from "react";

interface ProfileMenuProps {
    avatar_url?: string;
    name?: string;
    items?: { label: string, onClick: () => void }[];
    onLogout?: () => void;
}

const ProfileMenu = ({ avatar_url, name, items }: ProfileMenuProps) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={name ?? "John Doe"} src={avatar_url} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {items?.map((item) => (
                    <MenuItem key={item.label} onClick={() => {
                        item.onClick();
                        handleCloseUserMenu();
                    }}>
                        <Typography textAlign="center">{item.label}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default function GithubButton() {
    const { login, logout, isLoggedIn, user } = useGitHubAuth();
    const menuItems = [
        { label: "Logout", onClick: logout }
    ];

    const handleLogin = () => {
        if (isLoggedIn) {
            logout();
        } else {
            login();
        }

    }

    return (
        <>
            {!isLoggedIn ? (<Button
                onClick={handleLogin}
                variant="contained"
                color="success"
                startIcon={<GitHubIcon />}
            >
                Sign in
            </Button>) : null}
            {isLoggedIn && <ProfileMenu name={user?.name} avatar_url={user?.avatar_url} onLogout={logout} items={menuItems} />}
        </>
    )
}