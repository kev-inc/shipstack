export async function GET(req: Request) {
  const { clientId } = process.env;
  const host = req.headers.get("host");
  const authUrl = "https://github.com/login/oauth/authorize";
  const redirectUri = "https://" + host + "/auth";
  const url = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo%20user%20read:org%20read:discussion`;
  return Response.redirect(url);
}
