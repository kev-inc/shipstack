"use client";
import { useEffect, useState } from "react";
import { genSearchQuery } from "./graphql/search";
import { useSearchParams } from "next/navigation";
import { Category } from "@/models/models";
import PRSection from "@/components/PRSection";
import Sidebar from "@/components/Sidebar";
import { fetchGql } from "./utils/gql";
import { genCategoriesForViewer } from "./utils/constants";
import Appbar from "@/components/Appbar";
import Login from "@/components/Login";

type HomeState = {
  isLoading: boolean,
  categories: Category[],
}

export default function Home() {
  const searchParams = useSearchParams();
  const viewer = searchParams.get("viewer");
  const queryString = searchParams.get("q")

  const [data, setData] = useState<HomeState>({
    isLoading: true,
    categories: genCategoriesForViewer(viewer)
  })

  const query = {
    query: `
      query {
        mine: ${genSearchQuery(genCategoriesForViewer(viewer)[0].searchQuery || "")}
        pending: ${genSearchQuery(genCategoriesForViewer(viewer)[1].searchQuery || "")}
        approved: ${genSearchQuery(genCategoriesForViewer(viewer)[2].searchQuery || "")}
        changes_requested: ${genSearchQuery(genCategoriesForViewer(viewer)[3].searchQuery || "")}
      }
    `,
  };

  const ghToken = localStorage.getItem("ghToken");

  useEffect(() => {
    if (ghToken == null) return
    if (queryString == null) {
      fetchGql(query, ghToken)
        .then((res) => {
          setData({
            isLoading: false,
            categories: [
              {
                title: genCategoriesForViewer(viewer)[0].title,
                issues: res.data.mine.nodes,
                issueCount: res.data.mine.issueCount,
              },
              {
                title: genCategoriesForViewer(viewer)[1].title,
                issues: res.data.pending.nodes,
                issueCount: res.data.pending.issueCount,
              },
              {
                title: genCategoriesForViewer(viewer)[2].title,
                issues: res.data.approved.nodes,
                issueCount: res.data.approved.issueCount,
              },
              {
                title: genCategoriesForViewer(viewer)[3].title,
                issues: res.data.changes_requested.nodes,
                issueCount: res.data.changes_requested.issueCount,
              },
            ]
          })
        })
        .catch(() => setData({ ...data, isLoading: false }));
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
      fetchGql(customQuery, ghToken)
        .then((res) => {
          setData({
            isLoading: false,
            categories: [
              {
                title: `Search Results for '${queryString}'`,
                issueCount: res.data.results.issueCount,
                issues: res.data.results.nodes
              }
            ]
          })
        })
        .catch(() => setData({ ...data, isLoading: false }));
    }
  }, []);

  if (ghToken == null) return <Login />

  return (
    <div>
      <Appbar />
      <div className='flex'>
        <div className='w-64 hidden lg:block'>
          <Sidebar />
        </div>
        <div className="flex-1">
          {data.categories.map((category, index) => (
            <PRSection key={index} title={category.title} prs={category.issues || []} isLoading={data.isLoading} />
          ))}
        </div>
      </div>
    </div>

  );
}
