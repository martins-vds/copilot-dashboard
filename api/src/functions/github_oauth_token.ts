import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github_config } from "../config";
import { createToken } from "../github";

export async function github_oauth_token(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const { code } = await request.json() as any;

    if (!code) {
        return { status: 400, body: 'Bad request' };
    }

    const token = await createToken(code);

    return {
        body: JSON.stringify({
            token: token
        })
    };
};

app.http('github_oauth_token', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'github/oauth/token',
    handler: github_oauth_token
});
