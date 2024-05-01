/**
 * A GitHub organization.
 */
export interface Organization {
    avatar_url:         string;
    description:        null | string;
    events_url:         string;
    hooks_url:          string;
    id:                 number;
    issues_url:         string;
    login:              string;
    members_url:        string;
    node_id:            string;
    public_members_url: string;
    repos_url:          string;
    url:                string;
}

export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}