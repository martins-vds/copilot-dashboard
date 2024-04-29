import { User } from "./User";


export type Action = { type: "LOGIN"; payload: { isLoggedIn: boolean; user: User; }; } |
{
    type: "LOGOUT";
} |
{
    type: "SET_TOKEN";
    payload: string;
} |
{
    type: "SET_REDIRECT_URL";
    payload: string;
};
