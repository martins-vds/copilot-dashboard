import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getToken } from "../utils";
import { github } from "../github";

export async function logout(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);

    await github.revokeToken(token);

    return { status: 200, body: JSON.stringify({
        message: 'Logged out'
    })};
};

app.http('logout', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'github/logout',
    handler: logout
});
