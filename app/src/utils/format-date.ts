export function formatDate(value: string) {
    const date = Date.parse(value);

    if (isNaN(date)) {
        return value;
    }

    return new Date(date).toLocaleDateString("en-US", {
        month: 'short',
        day: 'numeric'
    })
}