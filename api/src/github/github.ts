import { HttpError } from "../types";
import { config } from "./config";

const github_uri = "https://github.com";
const github_api_uri = "https://api.github.com";

async function paginate(path: string, token: string, options: RequestInit = {}) {
    const results: unknown[] = [];
    let page = 1;

    while (true) {
        console.log(`Fetching page ${page} of ${path}`);

        const response = await resilientFetch(`${path}?page=${page}`, token, options);

        const data = await response.json();

        if (data.length === 0) {
            break;
        }

        results.push(...data);

        page++;
    }

    return results;
}

async function resilientFetch(path: string, token: string, options: RequestInit = {}, url: string = github_api_uri, auth_type: "Bearer" | "Basic" = "Bearer") {
    const response = await fetch(`${url}/${path}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `${auth_type} ${token}`,
            Accept: "application/vnd.github+json",
        }
    });

    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }

    return response;
}

export function getLoginUrl(redirect_url: string = "/") {
    const decoded_redirect_url = decodeURIComponent(redirect_url);
    const state = Math.random().toString(36).substring(7);
    return `https://github.com/login/oauth/authorize?client_id=${config.client_id}&scope=${config.scopes.join(' ')}&redirect_uri=${encodeURIComponent(decoded_redirect_url)}&state=${state}`
}

export async function getTeams(org: string, token: string) {
    const response = await resilientFetch(`orgs/${org}/teams`, token);

    const teams = await response.json();

    return teams.map((team: any) => {
        return {
            id: team.id,
            name: team.name,
            slug: team.slug,
        }
    });
}

export async function getTeamCopilotUsage(org: string, team_slug: string, token: string) {
    const response = await resilientFetch(`orgs/${org}/team/${team_slug}/copilot/usage`, token);

    return await response.json();
}

export async function getOrganizations(token: string) {
    const { login } = await getAuthenticatedUser(token);
    const organizations = await paginate(`users/${login}/orgs`, token);

    return organizations.map((org: any) => org.login);
}

export async function getOrganizationCopilotUsage(org: string, token: string) {
    const response = await resilientFetch(`orgs/${org}/copilot/usage`, token);

    return await response.json();
}

export async function getEnterprises(token: string) {
    const { login } = await getAuthenticatedUser(token);
    const response = await resilientFetch(`graphql`, token, {
        method: "POST",
        body: JSON.stringify({
            query: `
            query {
                user(login: "${login}") {
                    enterprises(first: 100) {
                        nodes {
                            slug
                        }
                    }
                }
            }
          `
        })
    });

    const { data } = await response.json();

    return data.user.enterprises.nodes.map((enterprise: any) => enterprise.slug);
}

export async function getEnterpriseCopilotUsage(enterprise: string, token: string) {
    const response = await resilientFetch(`enterprises/${enterprise}/copilot/usage`, token);

    return await response.json();
}

export async function getAuthenticatedUser(token: string) {
    const response = await resilientFetch(`user`, token);

    return await response.json();
}

export async function createToken(code: string) {
    const response = await resilientFetch(`login/oauth/access_token`, "", {
        method: "POST",
        body: JSON.stringify({
            client_id: config.client_id,
            client_secret: config.client_secret,
            code,
        }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    }, github_uri);

    const { access_token } = await response.json();

    return access_token;
}

export async function validateToken(token: string) {
    const basic_auth = Buffer.from(`${config.client_id}:${config.client_secret}`).toString("base64");

    try {
        const response = await resilientFetch(`applications/${config.client_id}/token`, basic_auth, {
            method: "POST",
            body: JSON.stringify({
                access_token: token,
            }),
        }, github_api_uri, "Basic");

        const validToken = await response.json();

        return config.scopes.every(scope => validToken.scopes.includes(scope));
    } catch (e) {
        return false;
    }
}

export async function revokeToken(token: string) {
    const basic_auth = Buffer.from(`${config.client_id}:${config.client_secret}`).toString("base64");

    await resilientFetch(`applications/${config.client_id}/token`, basic_auth, {
        method: "DELETE",
        body: JSON.stringify({
            access_token: token,
        }),
    }, github_api_uri, "Basic");
}