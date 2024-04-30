import { useContext } from "react";
import { github_config } from "./github-config";
import { GitHubContext, GitHubDispatchContext } from "./github-auth-provider";

export function useGitHubAuth() {
    const { isLoggedIn, user, token, redirect_url } = useContext(GitHubContext);
    const dispatch = useContext(GitHubDispatchContext);

    function login(redirect_url: string = "/") {
        const redirect_uri = encodeURIComponent(`${window.location.origin}${github_config.callback_url}`);
        dispatch({ type: "SET_REDIRECT_URL", payload: redirect_url });
        window.location.href = `https://github.com/login/oauth/authorize?scope=copilot,manage_billing:copilot,admin:org,admin:enterprise,user&client_id=${github_config.client_id}&redirect_uri=${redirect_uri}`;
    }

    function logout() {
        dispatch({ type: "LOGOUT" });
        window.location.href = "/";
    }

    async function createToken(code: string) {

        const response = await fetch(github_config.token_endpoint,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code
                }),
            }
        );
        
        const { token } = await response.json();

        dispatch({ type: "SET_TOKEN", payload: token });
    }

    return {
        isLoggedIn,
        user,
        token,
        token_endpoint: github_config.token_endpoint,
        redirect_url,
        login,
        logout,
        createToken
    };
}
