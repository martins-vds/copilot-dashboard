import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github, withErrorHandler } from "../github";

export async function organizations(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    return withErrorHandler(async () => {
        const response = await github.paginate(github.rest.orgs.listForAuthenticatedUser, { per_page: 100 })

        const organizations = response.map((org: any) => org.login)

        return { body: JSON.stringify(organizations), headers: { 'Content-Type': 'application/json' } };
    });
};

app.http('organizations', {
    methods: ['GET'],
    route: 'orgs',
    authLevel: 'anonymous',
    handler: organizations
});
