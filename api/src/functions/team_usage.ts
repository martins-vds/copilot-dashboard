import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";
import { getToken } from "../utils";

export async function team_usage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);

    const org = request.params.org;
    const team_slug = request.params.team_slug;

    try {
        const usage = await github.getTeamCopilotUsage(org, team_slug, token);

        return { body: JSON.stringify(usage), headers: { 'Content-Type': 'application/json' } };
    } catch (error) {
        return { status: error.status, body: JSON.stringify({ message: error.message }), headers: { 'Content-Type': 'application/json' } };
    }
};

app.http('team_usage', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'orgs/{org}/team/{team_slug}/copilot/usage',
    handler: team_usage
});
