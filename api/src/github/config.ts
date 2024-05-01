export const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    scopes: ['copilot', 'manage_billing:copilot', 'admin:org', 'admin:enterprise', 'user']
}