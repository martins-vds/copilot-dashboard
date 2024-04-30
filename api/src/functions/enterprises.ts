import { app, HttpRequest, HttpResponseInit, input, InvocationContext } from "@azure/functions";
import { github, withErrorHandler } from "../github";
import { getToken } from "../utils";


export async function enterprises(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const token = getToken(request);
  const client = github.client(token);

  return withErrorHandler(async () => {
    const {
      data: { login },
    } = await client.rest.users.getAuthenticated();

    const response = await client.request("POST /graphql", {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
      query: `
        query {
          user(login: "${login}") {
            enterprises(first: 100) {
              nodes {
                slug
              }
            }
          }
        }
      `
    });

    const enterprises = response.data.data.user.enterprises.nodes.map((enterprise: any) => enterprise.slug);

    return { body: JSON.stringify(enterprises), headers: { 'Content-Type': 'application/json' } };
  }, context.error);
};

app.http('enterprises', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: enterprises
});
