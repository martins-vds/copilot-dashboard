import { HttpRequest } from "@azure/functions";

export function getToken(request: HttpRequest) {
    let token = request.headers.get('Authorization') || "";

    token = token.replace("Bearer ", "").trim();

    return token;
}