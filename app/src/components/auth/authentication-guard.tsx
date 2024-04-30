import { useGitHubAuth } from "../../hooks/use-github-auth";
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

function withGithubAuthenticationRequired(Component: ComponentType) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (props: any) => {
        const { isLoggedIn } = useGitHubAuth();
        if (!isLoggedIn) {
            return <Navigate to="/" replace={true} />;
        }
        return <Component {...props} />;
    };
}

export default function AuthenticationGuard({ component }: { component: ComponentType }) {
    const Component = withGithubAuthenticationRequired(component);
    
    return <Component />;
}