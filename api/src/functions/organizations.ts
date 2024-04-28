import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";

export async function organizations(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const response = await github.request('GET /organizations', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    const organizations = response.data.map((org: any) => org.login)

    return { body: organizations, headers: { 'Content-Type': 'application/json' } };
};

app.http('organizations', {
    methods: ['GET'],
    route: 'orgs',
    authLevel: 'anonymous',
    handler: organizations
});
