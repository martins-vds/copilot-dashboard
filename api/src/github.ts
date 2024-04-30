import { Octokit } from "octokit";
import { github_config } from "./config";

export const createToken = async (code: string) => {
    const OAuthApp = await import("@octokit/oauth-app");

    const app = new OAuthApp.OAuthApp({
        clientType: "oauth-app",
        clientId: github_config.client_id,
        clientSecret: github_config.client_secret,
    });

    const {
        authentication: { token },
    } = await app.createToken({ code });
    return token;
}

function client(token: string) {
    return new Octokit({
        auth: token,
    });
}

export const github = {
    client
}
