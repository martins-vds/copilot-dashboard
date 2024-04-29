import { useGitHubAuth } from "../store/reducer/use-github-auth";
import { Button } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function GithubLoginButton() {
    const { login, logout, isLoggedIn } = useGitHubAuth();
    
    const handleLogin = () => {
        if (isLoggedIn) {
            logout();
        } else {
            login();
        }
    
    }

    return (
        <>
            <Button
                onClick={handleLogin}
                variant="contained"
                color="success"
                startIcon={<GitHubIcon />}
            >
                {isLoggedIn ? "Logout" : "Login with GitHub"}
            </Button>
        </>
    )
}