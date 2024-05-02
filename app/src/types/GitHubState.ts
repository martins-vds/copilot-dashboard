import { User } from "./User";


export interface GitHubState {
    isLoggedIn: boolean;
    user: User | null;    
    token: string;
    redirect_url: string;
    isLoading: boolean;
}
