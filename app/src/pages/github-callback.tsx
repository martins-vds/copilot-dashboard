import { useGitHubAuth } from "../hooks/use-github-auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function GitHubCallback() {
    const { isLoggedIn, createToken, redirect_url } = useGitHubAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // After requesting Github access, Github redirects back to your app with a code parameter
        const code = new URL(window.location.href).searchParams.get("code");

        // If Github API returns the code parameter
        if (code) {
            const path = location.pathname + location.search.replace(/\b(code|state)=\w+/g, "").replace(/[?&]+$/, "");
            history.replaceState({}, "", path);

            createToken(code);
            navigate(redirect_url);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoggedIn) {
        return (
            <div>
                <h1>GitHub Callback</h1>
                <p>Logged in</p>
            </div>
        )
    }

    return (
        <div>
            <h1>GitHub Callback</h1>
        </div>
    )
}