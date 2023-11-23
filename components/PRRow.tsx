import { PullRequest } from "@/models/models";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";

type PRRowProps = {
  pull: PullRequest
}

const PRRow = ({ pull }: PRRowProps) => {
  if (Object.keys(pull).length == 0) return <div></div>
  const status = (reviewDecision: string) => {
    switch (reviewDecision) {
      case "APPROVED":
        return (
          <span className="bg-green-100 text-green-500 rounded px-2 py-1 text-xs">
            Ready to Ship
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
          <span className="bg-yellow-100 text-yellow-500 rounded px-2 py-1 text-xs">
            Pending Review
          </span>
        );
      default:
        return (
          <span className="bg-blue-100 text-blue-500 rounded px-2 py-1 text-xs">
            Open
          </span>
        );
    }
  };
  const renderBuildStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span>🟡</span>;
      case "SUCCESS":
        return <span>🟢</span>;
      case "FAILURE":
        return <span>🔴</span>;
    }
  };
  return (
    <div className="px-4 py-2 border-t text-sm flex">
      <div className="flex-1">
        <div className='lg:hidden flex items-center text-xs text-gray-500 gap-x-1'>
          <Image
            src={pull.author.avatarUrl}
            alt="avatar"
            width={20}
            height={20}
            style={{ borderRadius: "50%" }}
          />
          <span>
            <Link
              href={pull.author.url}
              className="hover:underline"
              target="_blank"
            >
              {pull.author.login}
            </Link>
          </span>
          <span>•</span>
          <span>
            <Link
              href={pull.repository.url}
              className="hover:underline"
              target="_blank"
            >
              {pull.repository.owner.login}/{pull.repository.name}
            </Link>
          </span>
        </div>
        <div className="flex">
          <Link
            href={pull.url}
            className="hover:underline mr-1"
            target="_blank"
          >
            #{pull.number}: {pull.title}{" "}
          </Link>
          {renderBuildStatus(
            pull.commits.nodes[0].commit.statusCheckRollup?.state,
          )}
        </div>

        <div className="hidden lg:flex flex items-center text-xs text-gray-500 gap-x-1">
          <Image
            src={pull.author.avatarUrl}
            alt="avatar"
            width={20}
            height={20}
            style={{ borderRadius: "50%" }}
          />
          <span>
            <Link
              href={pull.author.url}
              className="hover:underline"
              target="_blank"
            >
              {pull.author.login}
            </Link>
          </span>
          <span>•</span>
          <span>
            <Link
              href={pull.repository.url}
              className="hover:underline"
              target="_blank"
            >
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
        <div className='lg:hidden flex items-center text-xs text-gray-500 gap-x-1'>

          <span>{moment(pull.updatedAt).fromNow()}</span>
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


export default PRRow