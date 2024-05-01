import { app, HttpRequest, HttpResponseInit, input, InvocationContext } from "@azure/functions";
import { github } from "../github";
import { getToken } from "../utils";


export async function enterprises(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const token = getToken(request);

  try {
    const enterprises = await github.getEnterprises(token);

    return { body: JSON.stringify(enterprises), headers: { 'Content-Type': 'application/json' } };
  } catch (error) {
    context.error("Error getting enterprises", error);
    return { status: error.status, body: JSON.stringify({ message: error.message }), headers: { 'Content-Type': 'application/json' } };
  }
};

app.http('enterprises', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: enterprises
});
