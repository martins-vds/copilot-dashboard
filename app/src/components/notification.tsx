import { Notification } from "@/types/Notification";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";

export interface NotificationProps {
    notification: Notification;    
}

export default function ToastNotification({ notification }: NotificationProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (notification.message) {
            setOpen(true);
        }
    }, [notification]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={handleClose} severity={notification.type}>
                {notification.message}
            </Alert>
        </Snackbar>
    );
}