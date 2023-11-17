export async function GET(req: Request) {
  const graphqlUrl = "https://api.github.com/graphql";
  const ghToken = req.headers.get("Ghtoken");
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const query = {
    query: `
      query {
        search(type:ISSUE, first: 5, query: "${q}") {
          issueCount
          nodes {
            ... on PullRequest {
              url
              number
              title
              reviewDecision
              author {
                login
                avatarUrl
                url
              }
              repository {
                name
                url
                owner {
                  login
                }
              }
              reviewRequests(first: 20) {
                nodes {
                  requestedReviewer {
                    ... on Team {
                      name
                    }
                    ... on User {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  };
  const searchStr = "";

  //   const { data } = await axios.post(graphqlUrl, JSON.stringify(query), {
  //     headers: {
  //       Authorization: `Bearer ${ghToken}`,
  //     },
  //   });
  const data = await fetch(graphqlUrl, {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      Authorization: `Bearer ${ghToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data.search);
  return Response.json(data);

  //   const host = req.headers.get("host");
  //   const authUrl = "https://github.com/login/oauth/authorize";
  //   const redirectUri = "https://" + host + "/auth";
  //   const url = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo%20user%20read:org%20read:discussion`;
  //   return Response.redirect(url);
}
