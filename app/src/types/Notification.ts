export interface Notification {
    message: string | undefined;
    type: 'success' | 'error' | 'warning' | 'info';
}