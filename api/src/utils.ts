import { HttpRequest, InvocationContext } from "@azure/functions";
import { RequestError } from "octokit";

export function getToken(request: HttpRequest){
    return request.headers.get('Authorization');
}
export const withErrorHandler = async (fn: () => Promise<any>, context: InvocationContext) => {
    try {
        return await fn();
    } catch (error) {
        context.error(error);

        if (error instanceof RequestError) {
            return { body: JSON.stringify(error.message), headers: { 'Content-Type': 'application/json' }, status: error.status };
        } else {
            throw error;
        }
    }
};
