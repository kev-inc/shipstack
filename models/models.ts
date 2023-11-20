export type User = {
    login: string;
    avatarUrl: string;
    url: string;
};

export type Repo = {
    name: string;
    url: string;
    owner: User;
};

export type PullRequest = {
    url: string;
    title: string;
    author: User;
    number: number;
    additions: number;
    deletions: number;
    repository: Repo;
    reviewDecision: string;
    updatedAt: string;
    isDraft: string;
    reviewRequests: {
        nodes: { requestedReviewer: User }[];
    };
    commits: {
        nodes: { commit: Commit }[];
    };
};

export type Commit = {
    statusCheckRollup: {
        state: string;
    };
};