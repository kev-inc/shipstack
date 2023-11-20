import { User } from "@/models/models"
import Image from "next/image"
import Link from "next/link"

type SidebarProps = {
    profile?: User
    categories: {
        title: string,
        prs: any[]
    }[]
}

const Sidebar = ({ profile, categories }: SidebarProps) => {
    if (profile == null) {
        return <SidebarLoading />
    }
    return (
        <div className='flex flex-col gap-y-6 p-6 text-gray-500 text-md'>
            <div className='flex items-center font-semibold gap-x-1'>
                <Image
                    src={profile.avatarUrl}
                    alt="avatar"
                    width={32}
                    height={32}
                    style={{ borderRadius: "50%" }}
                />
                <span className='ml-2 hover:underline cursor-pointer' onClick={() => window.location.href = '/'}>
                        {profile.login}
                </span>
            </div>

            {categories.map((category, index) => (
                <div key={index}>
                    <Link href={'#' + category.title} className='hover:underline'>
                        {category.title} ({category.prs.length})
                    </Link>
                </div>
            ))}

        </div>
    )
}

const SidebarLoading = () => (
    <div>Loading</div>
)

export default Sidebar