import { Octokit, RequestError } from "octokit";

export const github = new Octokit({
    auth: process.env['GITHUB_TOKEN']
})

export const withErrorHandler = async (fn: () => Promise<any>) => {
    try {
        return await fn();
    } catch (error) {
        if (error instanceof RequestError){
            return { body: JSON.stringify(error.message), headers: { 'Content-Type': 'application/json' }, status: error.status };
        }else{
            throw error;
        }
    }
}