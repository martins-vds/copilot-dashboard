import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";
import { getToken } from "../utils";


export async function organizations(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);

    try {
        const organizations = await github.getOrganizations(token);

        return { body: JSON.stringify(organizations), headers: { 'Content-Type': 'application/json' } };
    } catch (error) {
        context.error("Error getting organizations", error);
        return { status: error.status, body: JSON.stringify({ message: error.message }), headers: { 'Content-Type': 'application/json' } };
    }
};

app.http('organizations', {
    methods: ['GET'],
    route: 'orgs',
    authLevel: 'anonymous',
    handler: organizations
});
