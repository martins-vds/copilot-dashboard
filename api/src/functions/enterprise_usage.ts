import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";

export async function enterprise_usage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const enterprise = request.params.enterprise;

    const response = await github.request('GET /enterprises/{enterprise}/copilot/usage', {
        enterprise: enterprise,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    return { body: JSON.stringify(response.data), headers: { 'Content-Type': 'application/json' } };
};

app.http('enterprise_usage', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'enterprises/{enterprise}/copilot/usage',
    handler: enterprise_usage
});
