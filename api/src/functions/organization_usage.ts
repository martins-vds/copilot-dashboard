import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";
import { withErrorHandler } from "../utils";
import { getToken } from "../utils";

export async function organization_usage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);
    const org = request.params.org;

    return withErrorHandler(async () => {
        const response = await github.client(token).request('GET /orgs/{org}/copilot/usage', {
            org: org,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        return { body: JSON.stringify(response.data), headers: { 'Content-Type': 'application/json' } };
    }, context);
};

app.http('organization_usage', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'orgs/{org}/copilot/usage',
    handler: organization_usage
});
