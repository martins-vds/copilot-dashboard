import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getToken } from "../utils";
import { github } from "../github";
import { withErrorHandler } from "../utils";

export async function user(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const token = getToken(request);
    
    return withErrorHandler(async () => {
        const user = await github.client(token).rest.users.getAuthenticated();

        return { body: JSON.stringify(user.data), headers: { 'Content-Type': 'application/json' } };
    }, context);
};

app.http('user', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'user',
    handler: user
});
