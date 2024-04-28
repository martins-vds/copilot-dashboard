import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { github } from "../github";

export async function enterprises(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const user = "martins-vds";
    const query = `
    query($user_login:String!){
        user(login: $user_login){
          enterprises(first: 10){
            nodes{
              slug
            }
          }
        }
    }
    `

    const response = await github.graphql(query, {
        user_login: user
    }) as any;

    const enterprises = response.data.user.enterprises.nodes.map((enterprise: any) => enterprise.slug);

    return { body: JSON.stringify(enterprises), headers: { 'Content-Type': 'application/json' } };
};

app.http('enterprises', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: enterprises
});
