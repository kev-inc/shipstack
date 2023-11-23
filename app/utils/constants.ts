import { Category } from "@/models/models";

export const genCategoriesForViewer = (viewer: string | null): Category[] => ([
    {
        title: "My Pull Requests",
        searchQuery: `is:pr archived:false is:open sort:updated-desc author:${viewer || "@me"}`
    },
    {
        title: "Pending Review",
        searchQuery: `is:pr archived:false is:open draft:false sort:updated-desc review-requested:${viewer || "@me"}`
    },
    {
        title: "Approved",
        searchQuery: `is:pr archived:false is:open review:approved draft:false sort:updated-desc author:${viewer || "@me"}`
    },
    {
        title: "Changes Requested",
        searchQuery: `is:pr archived:false is:open review:changes_requested draft:false sort:updated-desc author:${viewer || "@me"}`
    }
])

