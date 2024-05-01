import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getToken } from "../utils";
import { github } from "../github";

export async function user(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);

    try {
        const user = await github.getAuthenticatedUser(token);

        return { body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } };
    } catch (error) {
        context.error(`Error getting user`, error, token);
        return { status: error.status, body: JSON.stringify({ message: error.message }), headers: { 'Content-Type': 'application/json' } };
    }
};

app.http('user', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'user',
    handler: user
});
