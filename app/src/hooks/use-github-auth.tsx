import { useContext } from "react";
import { github_config } from "../store/reducer/github-config";
import { GitHubContext, GitHubDispatchContext } from "../store/reducer/github-auth-provider";
import { useNavigate } from "react-router-dom";

export function useGitHubAuth() {
    const { isLoggedIn, user, token, redirect_url } = useContext(GitHubContext);
    const dispatch = useContext(GitHubDispatchContext);
    const navigate = useNavigate();

    function login(redirect_url: string = "/") {
        const redirect_uri = encodeURIComponent(`${window.location.origin}${github_config.callback_url}`);
        dispatch({ type: "SET_REDIRECT_URL", payload: redirect_url });
        window.location.href = `/api/github/login?redirect_url=${redirect_uri}`;
    }

    async function logout() {
        try {
            await fetch("/api/github/logout", {
                method: "POST",
                headers: {
                    Authorization: token,
                }
            });            
        } finally {
            dispatch({ type: "LOGOUT" });        
            navigate("/");
        }
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

        setUser(token);
    }

    async function setUser(token: string) {
        const response = await fetch("/api/user", {
            headers: {
                Authorization: token,
            },
        });

        if (response.ok) {
            const user = await response.json();
            dispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: user } });
        } else {
            dispatch({ type: "LOGOUT" });
        }
    }

    return {
        isLoggedIn,
        user,
        token,
        redirect_url,
        login,
        logout,
        createToken
    };
}
