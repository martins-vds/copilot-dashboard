import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github, withErrorHandler } from "../github";
import { getToken } from "../utils";


export async function organizations(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);

    return withErrorHandler(async () => {
        const response = await github.client(token).paginate(github.client(token).rest.orgs.listForAuthenticatedUser, { per_page: 100 })

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
