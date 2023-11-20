"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { genSearchQuery } from "./graphql/search";
import { useSearchParams } from "next/navigation";
import { PullRequest, User } from "@/models/models";
import PRSection from "@/components/PRSection";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const searchParams = useSearchParams();
  const viewer = searchParams.get("viewer");
  const queryString = searchParams.get("q")
  const graphqlUrl = "https://api.github.com/graphql";

  const [profile, setProfile] = useState<User>();
  const [mine, setMine] = useState<PullRequest[]>([]);
  const [pending, setPending] = useState<PullRequest[]>([]);
  const [approved, setApproved] = useState<PullRequest[]>([]);
  const [changes, setChanges] = useState<PullRequest[]>([]);
  const [searchResults, setSearchResults] = useState<PullRequest[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const query = {
    query: `
      query {
        viewer {
          login
          avatarUrl
          url
        }
        mine: ${genSearchQuery(
      `is:pr archived:false is:open sort:updated-desc author:${viewer || "@me"
      }`,
    )}
        pending: ${genSearchQuery(
      `is:pr archived:false is:open draft:false sort:updated-desc review-requested:${viewer || "@me"
      }`,
    )}
        approved: ${genSearchQuery(
      `is:pr archived:false is:open review:approved draft:false sort:updated-desc author:${viewer || "@me"
      }`,
    )}
        changes_requested: ${genSearchQuery(
      `is:pr archived:false is:open review:changes_requested draft:false sort:updated-desc author:${viewer || "@me"
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
    if (queryString == null) {
      fetch(graphqlUrl, {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
          Authorization: `Bearer ${ghToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setProfile(res.data.viewer)
          setMine(res.data.mine.nodes);
          setPending(res.data.pending.nodes);
          setApproved(res.data.approved.nodes);
          setChanges(res.data.changes_requested.nodes);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      const customQuery = {
        query: `
          query {
            viewer {
              login
              avatarUrl
              url
            }
            results: ${genSearchQuery(queryString, 50)}
          }
        `
      }
      fetch(graphqlUrl, {
        method: "POST",
        body: JSON.stringify(customQuery),
        headers: {
          Authorization: `Bearer ${ghToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setProfile(res.data.viewer)
          setSearchResults(res.data.results.nodes)
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }

  }, []);

  const categories = [
    { title: "My Pull Requests", prs: mine },
    { title: "Pending Review", prs: pending },
    { title: "Changes Requested", prs: changes },
    { title: "Ready to Ship", prs: approved },
  ]
  return (
    <main>
      <div className="flex p-4 bg-slate-100 text-gray-700 border-b font-semibold">
        ShipStack
      </div>

      <div className='flex'>
        <div className='w-64'>
          {queryString ? (
            <Sidebar profile={profile} categories={[{ title: 'Search Results', prs: searchResults }]} />
          ) : (
            <Sidebar profile={profile} categories={categories} />
          )}
        </div>
        <div className="flex-1">
          <SearchBar initialValue={queryString || ""}/>
          {queryString ? (
            <PRSection title={`Results for '${queryString}'`} prs={searchResults} isLoading={isLoading} />
          ) : (
            categories.map((category, index) => (
              <PRSection key={index} title={category.title} prs={category.prs} isLoading={isLoading} />
            ))
          )}

        </div>
      </div>

    </main>
  );
}
