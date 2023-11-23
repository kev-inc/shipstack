'use client'

import { useEffect, useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { fetchGql } from "./utils/gql";
import { User } from "@/models/models";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShipStack",
  description: "ShipStack",
};

const viewerQuery = {
  query: `
    query {
      viewer {
        login
        avatarUrl
      }
    }
  `
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<User>()
  useEffect(() => {
    const ghToken = localStorage.getItem("ghToken");
    if (ghToken == null) {
      window.location.href = "/api/auth";
      return;
    }
    fetchGql(viewerQuery, ghToken)
      .then(res => {

      })
  }, [])
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex p-4 bg-slate-100 text-gray-700 border-b font-semibold">
          ShipStack
        </div>
        <div className='flex'>
          <div className='w-64 hidden lg:block'>
            <Sidebar />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
