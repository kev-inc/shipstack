const { clientId } = process.env;
const authUrl = "https://github.com/login/oauth/authorize";
const redirectUri = "https://25tfrc-3000.csb.app/login/success";

export async function GET(req: Request) {
  const url =
    authUrl +
    `?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo%20user%20read:org%20read:discussion`;
  return Response.json({ hello: req.headers.get("host") });
}
