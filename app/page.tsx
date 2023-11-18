"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { genSearchQuery } from "./graphql/search";
import { useSearchParams } from "next/navigation";

type User = {
  login: string;
  avatarUrl: string;
  url: string;
};
type Repo = {
  name: string;
  url: string;
  owner: User;
};
type PullRequest = {
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
};

const PullCardLoader = () => (
  <div className="animate-pulse px-4 py-2 border-t text-sm flex">
    <div className="flex-1">
      <div className="h-3 bg-slate-200 rounded w-96 mb-2"></div>
      <div className="flex items-center text-xs text-gray-500 gap-x-1">
        <div className="rounded-full bg-slate-200 h-5 w-5"></div>
        <div className="h-3 bg-slate-200 rounded w-16"></div>
        <span className="text-slate-200">•</span>
        <div className="h-3 bg-slate-200 rounded w-28"></div>
      </div>
    </div>
    <div className="flex items-center">
      <div className="h-3 bg-slate-200 rounded w-16"></div>
    </div>
  </div>
);

const PullCard = ({ pull }: { pull: PullRequest }) => {
  const status = (reviewDecision: string) => {
    switch (reviewDecision) {
      case "APPROVED":
        return (
          <span className="bg-green-100 text-green-500 rounded px-2 py-1 text-xs">
            Approved
          </span>
        );
      case "CHANGES_REQUESTED":
        return (
          <span className="bg-red-100 text-red-500 rounded px-2 py-1 text-xs">
            Changes Requested
          </span>
        );
      case "REVIEW_REQUIRED":
        return (
          <span className="bg-blue-100 text-blue-500 rounded px-2 py-1 text-xs">
            Review Required
          </span>
        );
    }
  };
  return (
    <div className="px-4 py-2 border-t text-sm flex">
      <div className="flex-1">
        <Link href={pull.url} className="hover:underline">
          #{pull.number}: {pull.title}
        </Link>
        <div className="flex items-center text-xs text-gray-500 gap-x-1">
          <Image
            src={pull.author.avatarUrl}
            alt="avatar"
            width={20}
            height={20}
            style={{ borderRadius: "50%" }}
          />
          <span>
            <Link href={pull.author.url} className="hover:underline">
              {pull.author.login}
            </Link>
          </span>
          <span>•</span>
          <span>
            <Link href={pull.repository.url} className="hover:underline">
              {pull.repository.owner.login}/{pull.repository.name}
            </Link>
          </span>
          <span>•</span>
          <span className="text-green-700">+{pull.additions} </span>
          <span className="text-red-700">-{pull.deletions}</span>
          <span>•</span>
          <span>{moment(pull.updatedAt).fromNow()}</span>
          {/* <span>•</span>
          <span>
            {pull.reviewRequests.nodes
              .map((n) => n.requestedReviewer.login)
              .join(",")}
          </span> */}
        </div>
      </div>
      <div className="flex items-center">
        {pull.isDraft ? (
          <span className="bg-gray-100 text-gray-500 rounded px-2 py-1 text-xs">
            Draft
          </span>
        ) : (
          status(pull.reviewDecision)
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const searchParams = useSearchParams();
  const viewer = searchParams.get("viewer");
  const graphqlUrl = "https://api.github.com/graphql";

  const [mine, setMine] = useState<PullRequest[]>([]);
  const [pending, setPending] = useState<PullRequest[]>([]);
  const [approved, setApproved] = useState<PullRequest[]>([]);
  const [changes, setChanges] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const query = {
    query: `
    query {
      mine: ${genSearchQuery(
        `is:pr archived:false is:open ${viewer && "author:" + viewer}`,
      )}
      pending: ${genSearchQuery(
        `is:pr archived:false is:open review:required ${
          viewer && "review-required:" + viewer
        }`,
      )}
      approved: ${genSearchQuery(
        `is:pr archived:false is:open review:approved ${
          viewer && "author:" + viewer
        }`,
      )}
      changes_requested: ${genSearchQuery(
        `is:pr archived:false is:open review:changes_requested ${
          viewer && "author:" + viewer
        }`,
      )}
    }
  `,
  };

  useEffect(() => {
    const ghToken = localStorage.getItem("ghToken");
    if (ghToken == null) {
      window.location.href = "/api/auth";
      return;
    }
    setIsLoading(true);
    fetch(graphqlUrl, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        Authorization: `Bearer ${ghToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMine(res.data.mine.nodes);
        setPending(res.data.pending.nodes);
        setApproved(res.data.approved.nodes);
        setChanges(res.data.changes_requested.nodes);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);
  return (
    <main>
      <div className="flex p-4 bg-slate-100 text-gray-700 border-b font-semibold">
        ShipStack
      </div>

      <div className=" m-4 border rounded">
        <div className="px-4 py-2 font-medium bg-slate-50 text-gray-900">
          My Pull Requests ({mine.length})
        </div>

        {mine.length > 0 ? (
          mine.map((pull, index) => <PullCard key={index} pull={pull} />)
        ) : isLoading ? (
          <div>
            <PullCardLoader />
            <PullCardLoader />
            <PullCardLoader />
          </div>
        ) : (
          <div className="flex p-4 text-xs justify-center text-gray-500">
            No results found
          </div>
        )}
      </div>
      <div className=" m-4 border rounded">
        <div className="px-4 py-2 font-medium bg-slate-50 text-gray-900">
          Pending Review ({pending.length})
        </div>

        {pending.length > 0 ? (
          pending.map((pull, index) => <PullCard key={index} pull={pull} />)
        ) : isLoading ? (
          <div>
            <PullCardLoader />
            <PullCardLoader />
            <PullCardLoader />
          </div>
        ) : (
          <div className="flex p-4 text-xs justify-center text-gray-500">
            No results found
          </div>
        )}
      </div>

      <div className=" m-4 border rounded">
        <div className="px-4 py-2 font-medium bg-slate-50 text-gray-900">
          Changes Requested ({changes.length})
        </div>

        {changes.length > 0 ? (
          changes.map((pull, index) => <PullCard key={index} pull={pull} />)
        ) : isLoading ? (
          <div>
            <PullCardLoader />
            <PullCardLoader />
            <PullCardLoader />
          </div>
        ) : (
          <div className="flex p-4 text-xs justify-center text-gray-500">
            No results found
          </div>
        )}
      </div>

      <div className=" m-4 border rounded">
        <div className="px-4 py-2 font-medium bg-slate-50 text-gray-900">
          Ready to ship ({approved.length})
        </div>

        {approved.length > 0 ? (
          approved.map((pull, index) => <PullCard key={index} pull={pull} />)
        ) : isLoading ? (
          <div>
            <PullCardLoader />
            <PullCardLoader />
            <PullCardLoader />
          </div>
        ) : (
          <div className="flex p-4 text-xs justify-center text-gray-500">
            No results found
          </div>
        )}
      </div>
    </main>
  );
}
