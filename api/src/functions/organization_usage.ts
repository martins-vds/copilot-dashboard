import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";
import { getToken } from "../utils";

export async function organization_usage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);
    const org = request.params.org;

    try {
        const usage = await github.getOrganizationCopilotUsage(org, token);

        return { body: JSON.stringify(usage), headers: { 'Content-Type': 'application/json' } };
    } catch (error) {
        return { status: error.status, body: JSON.stringify({ message: error.message }), headers: { 'Content-Type': 'application/json' } };
    }
};

app.http('organization_usage', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'orgs/{org}/copilot/usage',
    handler: organization_usage
});
