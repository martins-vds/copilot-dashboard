import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github, withErrorHandler } from "../github";
import { getToken } from "../utils";


export async function organizations(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);

    return withErrorHandler(async () => {
        const client = github.client(token);
        const { data: { login } } = await client.rest.users.getAuthenticated();
        const response = await client.paginate(client.rest.orgs.listForUser, { per_page: 100, username: login })

        const organizations = response.map((org: any) => org.login)

        return { body: JSON.stringify(organizations), headers: { 'Content-Type': 'application/json' } };
    }, context.error);
};

app.http('organizations', {
    methods: ['GET'],
    route: 'orgs',
    authLevel: 'anonymous',
    handler: organizations
});
