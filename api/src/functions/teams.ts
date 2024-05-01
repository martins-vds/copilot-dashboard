import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";
import { getToken } from "../utils";

export async function teams(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);
    const org = request.params.org;

    try {
        const teams = await github.getTeams(org, token);

        return { body: JSON.stringify(teams), headers: { 'Content-Type': 'application/json' } };
    } catch (error) {
        return { status: error.status, body: JSON.stringify({ message: error.message }), headers: { 'Content-Type': 'application/json' } };
    }
};

app.http('teams', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'orgs/{org}/teams',
    handler: teams
});
