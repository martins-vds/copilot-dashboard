import { useLocation } from "react-router-dom";
import { useGitHubAuth } from "../../hooks/use-github-auth";
import { ComponentType, useEffect } from "react";
import { Typography } from "@mui/material";

function withGithubAuthenticationRequired(Component: ComponentType) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (props: any) => {
        const { isLoggedIn, isLoading, login } = useGitHubAuth();
        const location = useLocation();

        useEffect(() => {
            if (isLoggedIn || isLoading) return;

            (async () => {
                await login(location.pathname);
            })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isLoggedIn, isLoading, login]);

        return (
            <>
                {isLoggedIn ?
                    <Component {...props} /> :
                    (<>                       
                        <Typography>
                            Please wait while we redirect you to the GitHub authentication page.
                        </Typography>
                    </>)
                }
            </>
        );
    };
}

export default function AuthenticationGuard({ component }: { component: ComponentType }) {
    const Component = withGithubAuthenticationRequired(component);

    return <Component />;
}