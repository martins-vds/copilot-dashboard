import { HttpRequest } from "@azure/functions";

export function getToken(request: HttpRequest){
    return request.headers.get('Authorization');
}