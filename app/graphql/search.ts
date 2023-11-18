export const genSearchQuery = (query: string, first: number = 20) => {
  return `search(type:ISSUE, first: ${first}, query: "${query}") {
        issueCount
        nodes {
          ... on PullRequest {
            url
            number
            title
            updatedAt
            reviewDecision
            additions
            deletions
            isDraft
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
            commits(last: 1) {
              nodes{
                commit {
                  statusCheckRollup {
                    state
                  }
                }
              }
            }
          }
        }
      }
    `;
};
