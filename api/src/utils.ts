import { HttpRequest } from "@azure/functions";

export function getToken(request: HttpRequest) {
    let token = request.headers.get('X-GitHub-Token') || "";

    token = token.trim();

    return token;
}