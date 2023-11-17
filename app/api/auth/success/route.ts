export async function GET(req: Request) {
  const { clientId, clientSecret } = process.env;
  const host = req.headers.get("host");
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const atUrl = "https://github.com/login/oauth/access_token";
  const formData = new FormData();
  formData.append("client_id", clientId!);
  formData.append("client_secret", clientSecret!);
  formData.append("code", code!);
  formData.append("redirect_url", `https://${host}`);
  const data = await fetch(atUrl, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return Response.json(data);
}
