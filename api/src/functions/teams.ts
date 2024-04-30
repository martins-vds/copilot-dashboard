import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";
import { withErrorHandler } from "../utils";
import { getToken } from "../utils";

export async function teams(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);
    const org = request.params.org;
    
    return withErrorHandler(async () => {
        const response = await github.client(token).request('GET /orgs/{org}/teams', {
            org: org,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    
        const teams = response.data.map((team: any) => {
            return {
                id: team.id,
                name: team.name,
                slug: team.slug,            
            }
        })
    
        return { body: JSON.stringify(teams), headers: { 'Content-Type': 'application/json' } };
    }, context);
};

app.http('teams', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'orgs/{org}/teams',
    handler: teams
});
