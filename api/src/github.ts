import { Octokit, RequestError } from "octokit";
import { github_config } from "./config";
import { input } from "@azure/functions";

export const withErrorHandler = async (fn: () => Promise<any>) => {
    try {
        return await fn();
    } catch (error) {
        if (error instanceof RequestError) {
            return { body: JSON.stringify(error.message), headers: { 'Content-Type': 'application/json' }, status: error.status };
        } else {
            throw error;
        }
    }
}

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

function client(token: string){
    return new Octokit({
        auth: `${token}`,
    });
}

export const github = {
    client
}
