import { app, FunctionHandler, HttpRequest, HttpResponseInit, InvocationContext, PreInvocationContext } from '@azure/functions';

app.hook.preInvocation((context: PreInvocationContext) => {
    context.invocationContext.info('Checking token');
    
    if (context.invocationContext.functionName !== 'github_oauth_token') {
        const next = context.functionHandler;
        context.functionHandler = (request: HttpRequest, context: InvocationContext) => check_token(request, context, next);        
    }else{
        context.invocationContext.info('Skipping token check for github_oauth_token function');
    }
});

async function check_token(request: HttpRequest, context: InvocationContext, next: FunctionHandler): Promise<HttpResponseInit>{
    const token = request.headers.get('Authorization');
    
    if (!token) {
        return { status: 401, body: 'Unauthorized' };
    }

    return await next(request, context);
}