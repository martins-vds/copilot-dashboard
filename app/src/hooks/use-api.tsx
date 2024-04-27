import { CopilotUsageData } from "@/types";

export function useApi() {
    async function fetchOrgUsageData(org: string) : Promise<CopilotUsageData[]> {
        const response = await fetch(`api/orgs/${org}/copilot/usage`);
        return await response.json();
    }

    return {
        fetchOrgUsageData,
    }
}