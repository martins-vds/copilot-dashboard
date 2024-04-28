import { CopilotUsageData } from "@/types";

export function useApi() {
    async function fetchEnterprises() : Promise<string[]> {
        const response = await fetch(`api/enterprises`);
        return await response.json();
    }

    async function fetchEnterpriseUsageData(enterprise: string) : Promise<CopilotUsageData[]> {
        const response = await fetch(`api/enterprises/${enterprise}/copilot/usage`);
        return await response.json();
    }

    async function fetchOrgUsageData(org: string) : Promise<CopilotUsageData[]> {
        const response = await fetch(`api/orgs/${org}/copilot/usage`);
        return await response.json();
    }

    async function fetchOrgs() : Promise<string[]> {
        const response = await fetch(`api/orgs`);
        return await response.json();
    }

    async function fetchTeams(org: string) : Promise<string[]> {
        const response = await fetch(`api/orgs/${org}/teams`);
        return await response.json();
    }

    async function fetchTeamUsageData(org: string, team: string) : Promise<CopilotUsageData[]> {
        const response = await fetch(`api/orgs/${org}/teams/${team}/copilot/usage`);
        return await response.json();
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