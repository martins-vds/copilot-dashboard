import { app, FunctionHandler, HttpRequest, HttpResponseInit, InvocationContext, PreInvocationContext } from '@azure/functions';
import { getToken } from '../utils';
import { validateToken } from '../github/github';

const unauthenticaded_functions = ['github_oauth_token', 'github_oauth_login'];

app.hook.preInvocation((context: PreInvocationContext) => {
    context.invocationContext.info('Checking token');

    if (exemptFromAuthentication(context.invocationContext.functionName)) {
        context.invocationContext.info('Skipping token check for github_oauth_token function');
    } else {
        const next = context.functionHandler;
        context.functionHandler = (request: HttpRequest, context: InvocationContext) => checkToken(request, context, next);
    }
});

async function checkToken(request: HttpRequest, context: InvocationContext, next: FunctionHandler): Promise<HttpResponseInit> {
    const token = getToken(request);

    if (!token) {
        return { status: 401, body: 'Token not found' };
    }

    if (validateToken(token)) {
        return await next(request, context);
    } else {
        return { status: 401, body: 'Invalid token' };
    }

}

function exemptFromAuthentication(functionName: string) {
    return unauthenticaded_functions.includes(functionName);
}