import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";
import { getToken } from "../utils";

export async function enterprise_usage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);
    const enterprise = request.params.enterprise;

    try {
        const usage = await github.getEnterpriseCopilotUsage(enterprise, token);

        return { body: JSON.stringify(usage), headers: { 'Content-Type': 'application/json' } };
    } catch (error) {
        return { status: error.status, body: JSON.stringify({ message: error.message }), headers: { 'Content-Type': 'application/json' } };
    }
};

app.http('enterprise_usage', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'enterprises/{enterprise}/copilot/usage',
    handler: enterprise_usage
});
