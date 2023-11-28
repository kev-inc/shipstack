'use client'

import { genCategoriesForViewer } from "@/app/utils/constants"
import { fetchGql } from "@/app/utils/gql"
import { Category, User } from "@/models/models"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Badge from "./Badge"
import { CheckCircleIcon, ExclaimationCircleIcon, PullRequestIcon, ReplyIcon } from "./Icons"

const query = {
    query: `
        query {
            viewer {
                login
                avatarUrl
            }
            mine: search(type:ISSUE, query: "${genCategoriesForViewer(null)[0].searchQuery}") {
                issueCount
            }
            pending: search(type:ISSUE, query: "${genCategoriesForViewer(null)[1].searchQuery}") {
                issueCount
            }
            approved: search(type: ISSUE, query: "${genCategoriesForViewer(null)[2].searchQuery}") {
                issueCount
            }
            changes_requested: search(type: ISSUE, query: "${genCategoriesForViewer(null)[3].searchQuery}") {
                issueCount
            }
        }
    `
}

type SidebarProps = {
    profile?: User
    categories: {
        title: string,
        prs: any[]
    }[]
}

type SidebarState = {
    user: User | null,
    categories: Category[],
}

const Sidebar = () => {

    const [data, setData] = useState<SidebarState>({
        user: null,
        categories: []
    })

    useEffect(() => {
        const ghToken = localStorage.getItem("ghToken")
        if (ghToken == null) {
            return
        }
        fetchGql(query, ghToken)
            .then(res => {
                setData({
                    user: res.data.viewer,
                    categories: [
                        {
                            title: genCategoriesForViewer(null)[0].title,
                            ...res.data.mine,
                        }, {
                            title: genCategoriesForViewer(null)[1].title,
                            ...res.data.pending
                        },
                        {
                            title: genCategoriesForViewer(null)[2].title,
                            ...res.data.changes_requested
                        },
                        {
                            title: genCategoriesForViewer(null)[3].title,
                            ...res.data.approved
                        }
                    ],
                })
            })
    }, [])
    if (data.user == null) {
        return <SidebarLoading />
    }

    const icons = [
        <PullRequestIcon key={0}/>,
        <ExclaimationCircleIcon  key={1}/>,
        <CheckCircleIcon  key={2}/>,
        <ReplyIcon  key={3}/>,
    ]
    return (
        <div className='flex flex-col gap-y-6 p-6 font-medium text-[#050505] text-md'>
            <div className='flex items-center gap-x-1'>
                <Image
                    src={data.user.avatarUrl}
                    alt="avatar"
                    width={32}
                    height={32}
                    style={{ borderRadius: "50%" }}
                />
                <span className='ml-2 hover:underline cursor-pointer' onClick={() => window.location.href = '/'}>
                    {data.user.login}
                </span>
            </div>

            {data.categories.map((category, index) => (
                <div key={index} className='flex items-center gap-x-2'>
                    {icons[index]}
                    <Link href={'#' + category.title} className='hover:underline'>
                        {category.title} <Badge number={category.issueCount} />
                    </Link>
                </div>
            ))}

        </div>
    )
}

const SidebarLoading = () => (
    <div className='animate-pulse flex flex-col gap-y-6 p-6 text-gray-500 text-md'>
        <div className='flex items-center font-semibold gap-x-1'>
            <div className='w-8 h-8 bg-slate-200 rounded-full'></div>
            <span className='ml-2 h-3 bg-slate-200 w-16'></span>
        </div>

        <div className='h-3 bg-slate-200 w-32'></div>

    </div>

)

export default Sidebar