import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github, withErrorHandler } from "../github";
import { getToken } from "../utils";

export async function team_usage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);

    const org = request.params.org;
    const team_slug = request.params.team_slug;

    return withErrorHandler(async () => {
        const response = await github.client(token).request('GET /orgs/{org}/team/{team_slug}/copilot/usage', {
            org: org,
            team_slug: team_slug,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        return { body: JSON.stringify(response.data), headers: { 'Content-Type': 'application/json' } };
    }, context.error);
};

app.http('team_usage', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'orgs/{org}/team/{team_slug}/copilot/usage',
    handler: team_usage
});
