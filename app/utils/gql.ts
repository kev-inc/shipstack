const graphqlUrl = "https://api.github.com/graphql";

export const fetchGql = async (query: any, ghToken: string) => {
    return fetch(graphqlUrl, {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
            Authorization: `Bearer ${ghToken}`,
        },
    }).then((res) => res.json())
}