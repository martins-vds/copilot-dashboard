import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";

export async function teams(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const org = request.params.org;
    
    const response = await github.request('GET /orgs/{org}/teams', {
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
};

app.http('teams', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'orgs/{org}/teams',
    handler: teams
});
