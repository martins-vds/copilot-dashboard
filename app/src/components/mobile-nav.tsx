import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface MobileNavProps {
    onClose?: () => void;
    open?: boolean;
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {

    return (
        <Drawer
            PaperProps={{
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    scrollbarWidth: 'none',
                    width: 230,
                    zIndex: 1100,
                    '&::-webkit-scrollbar': { display: 'none' },
                },
            }}
            onClose={onClose}
            open={open}
        >
            <Stack spacing={2} sx={{ p: 3 }}>
                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: 'var(--mui-palette-neutral-950)',
                        border: '1px solid var(--mui-palette-neutral-700)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        p: '4px 12px',
                    }}
                >
                    <Box sx={{ flex: '1 1 auto' }}>
                        <Typography color="var(--mui-palette-neutral-400)" variant="body2">
                            Workspace
                        </Typography>
                        <Typography color="inherit" variant="subtitle1">
                            Devias
                        </Typography>
                    </Box>
                </Box>
            </Stack>
            <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />

        </Drawer>
    );
}