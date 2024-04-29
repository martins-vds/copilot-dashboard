import { CopilotUsageData } from "@/types/CopilotUsageData";

const doFetch = async (url: string) => {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export function useApi() {
    async function fetchEnterprises() : Promise<string[]> {
        return await doFetch('api/enterprises');
    }

    async function fetchEnterpriseUsageData(enterprise: string) : Promise<CopilotUsageData[]> {
        return await doFetch(`api/enterprises/${enterprise}/copilot/usage`);
    }

    async function fetchOrgUsageData(org: string) : Promise<CopilotUsageData[]> {
        return await doFetch(`api/orgs/${org}/copilot/usage`);
    }

    async function fetchOrgs() : Promise<string[]> {
        return await doFetch('api/orgs');
    }

    async function fetchTeams(org: string) : Promise<string[]> {
        return await doFetch(`api/orgs/${org}/teams`);
    }

    async function fetchTeamUsageData(org: string, team: string) : Promise<CopilotUsageData[]> {
        return await doFetch(`api/orgs/${org}/teams/${team}/copilot/usage`);
    }

    return {
        fetchEnterprises,
        fetchEnterpriseUsageData,
        fetchOrgs,
        fetchOrgUsageData,
        fetchTeams,
        fetchTeamUsageData,
    }
}