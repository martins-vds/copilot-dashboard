import { Dispatch, createContext, useReducer } from "react";
import { GitHubState } from "../../types/GitHubState";
import { Action } from "../../types/Action";
import { github_config } from "./github-config";

const state_key = `github_state_${github_config.client_id}`;

const initialState: GitHubState = {
    isLoggedIn: false,
    user: null,
    token: "",
    redirect_url: "/"
};

export const GitHubContext = createContext<GitHubState>({} as GitHubState);
export const GitHubDispatchContext = createContext<Dispatch<Action>>(() => { return initialState; });

interface GitHubProviderProps {
    children: React.ReactNode
}

export function GitHubAuthProvider({ children }: GitHubProviderProps) {
    const [state, dispatch] = useReducer(
        GitHubReducer,
        initialState,
        () => {
            const localData = localStorage.getItem(state_key);
            return localData ? JSON.parse(localData) : initialState;
        }
    );

    return (
        <GitHubContext.Provider value={state}>
            <GitHubDispatchContext.Provider value={dispatch}>
                {children}
            </GitHubDispatchContext.Provider>
        </GitHubContext.Provider>
    );
}

function GitHubReducer(state: GitHubState, action: Action) {
    switch (action.type) {
        case "LOGIN": {
            const newState = {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.user
            };

            localStorage.setItem(state_key, JSON.stringify(newState))

            return newState;
        }
        case "LOGOUT": {
            localStorage.removeItem(state_key)
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                token: ""
            };
        }
        case "SET_TOKEN": {
            const newState = {
                ...state,
                isLoggedIn: true,
                token: action.payload
            }
            localStorage.setItem(state_key, JSON.stringify(newState))
            return newState;
        }
        case "SET_REDIRECT_URL": {
            return {
                ...state,
                redirect_url: action.payload
            };
        }
        default:
            return state;
    }
}

