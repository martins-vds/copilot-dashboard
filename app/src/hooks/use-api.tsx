import { User } from "@/types/User";
import { useGitHubAuth } from "./use-github-auth";
import { CopilotUsageData } from "@/types/CopilotUsageData";

const doFetch = async (url: string, token: string) => {
    const response = await fetch(url, {
        headers: {
            'Authorization': `${token}`
        },

    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export function useApi() {
    const { token } = useGitHubAuth();

    async function fetchEnterprises(): Promise<string[]> {
        return await doFetch('api/enterprises', token);
    }

    async function fetchEnterpriseUsageData(enterprise: string): Promise<CopilotUsageData[]> {
        return await doFetch(`api/enterprises/${enterprise}/copilot/usage`, token);
    }

    async function fetchOrgUsageData(org: string): Promise<CopilotUsageData[]> {
        return await doFetch(`api/orgs/${org}/copilot/usage`, token);
    }

    async function fetchOrgs(): Promise<string[]> {
        return await doFetch('api/orgs', token);
    }

    async function fetchTeams(org: string): Promise<string[]> {
        return await doFetch(`api/orgs/${org}/teams`, token);
    }

    async function fetchTeamUsageData(org: string, team: string): Promise<CopilotUsageData[]> {
        return await doFetch(`api/orgs/${org}/teams/${team}/copilot/usage`, token);
    }

    async function fetchUser(): Promise<User> {
        return await doFetch('api/user', token);
    }

    return {
        fetchEnterprises,
        fetchEnterpriseUsageData,
        fetchOrgs,
        fetchOrgUsageData,
        fetchTeams,
        fetchTeamUsageData,
        fetchUser
    }
}