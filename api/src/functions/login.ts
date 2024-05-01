import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";

export async function githubLogin(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const redirectUrl = request.query.get('redirect_url');

    const authorizationUrl = github.getLoginUrl(redirectUrl);

    return { status: 302, headers: { 'Location': authorizationUrl }};
};

app.http('github_oauth_login', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'github/login',
    handler: githubLogin
});
