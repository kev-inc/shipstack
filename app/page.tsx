"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type User = {
  login: string;
  avatarUrl: string;
};
type Repo = {
  name: string;
  owner: User;
};
type PullRequest = {
  url: string;
  title: string;
  author: User;
  number: number;
  repository: Repo;
  reviewDecision: string;
};

const PullCard = ({ pull }: { pull: PullRequest }) => {
  return (
    <div className="p-4 m-4 border rounded">
      <div className="text-gray-500 text-sm mr-2">
        {pull.repository.owner.login}/${pull.repository.name}
      </div>
      <Link href={pull.url} className="hover:underline">
        #{pull.number}: {pull.title}
      </Link>
      <div className="flex items-center">
        <Image
          src={pull.author.avatarUrl}
          alt="avatar"
          width={28}
          height={28}
          style={{ borderRadius: "50%" }}
        />
        <div className="ml-2">
          {pull.author.login}{" "}
          <span className="bg-gray-100 text-gray-500 rounded px-2 py-1 text-sm">
            {pull.reviewDecision}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [pulls, setPulls] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://25tfrc-3000.csb.app/pulls")
      .then((resp) => resp.json())
      .then((data) => {
        setPulls(data.data.search.nodes);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);
  return (
    <main>
      {pulls.length > 0 ? (
        pulls.map((pull, index) => <PullCard key={index} pull={pull} />)
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>No results found</div>
      )}
    </main>
  );
}
