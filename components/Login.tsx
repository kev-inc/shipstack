import Link from "next/link"
import { GithubIcon } from "./Icons"


const Login = () => {
    return (
        <div className='flex flex-col gap-y-4'>
            <div className="flex items-center py-2 px-4 h-14 bg-white shadow-sm">
                <div className='font-semibold text-gray-700 w-64'>
                    ShipStack
                </div>
                <div className='flex-1 flex justify-end gap-x-8 items-center'>
                    <Link href="#" className='font-medium text-gray-700 hover:underline'>Home</Link>
                    <Link href="#Features" className='font-medium text-gray-700 hover:underline'>Features</Link>
                    <Link href="#Getting Started" className='font-medium text-gray-700 hover:underline'>Getting Started</Link>
                    <Link href="#Contact Us" className='font-medium text-gray-700 hover:underline'>Contact Us</Link>
                    <Link href="/api/auth" className="bg-black text-white font-semibold px-4 py-2 rounded flex items-center gap-x-2">
                        <span>Sign in</span>
                    </Link>
                </div>
            </div>
            <div className=''>
                <div className="container mx-auto bg-white rounded-lg shadow flex flex-col p-4 items-center pt-40 pb-40">
                    <div className="text-gray-700 font-medium tracking-wider">Welcome to</div>
                    <div className="text-7xl font-bold tracking-wide">ShipStack</div>
                    <div className="text-gray-700 font-medium tracking-wider pt-8 pb-8">Get your pull requests to shore faster</div>
                    <Link href="/api/auth" className="bg-black text-white font-semibold px-4 py-2 rounded flex items-center gap-x-2">
                        <GithubIcon />
                        <span>Sign in with Github</span>
                    </Link>
                </div>
            </div>
            <div className='bg-white' id="Features">
                <div className="container mx-auto py-20">
                    <div className="text-3xl text-center font-semibold pb-20">
                        Unified dashboard to see all your actionable Pull Requests
                    </div>
                    <div className="flex pb-8">
                        <div className="py-12 pl-20 flex flex-col gap-y-4 flex-1">
                            <div>
                                <div className="text-2xl font-medium">My Pull Requests (slide in)</div>
                                <div className="text-gray-500">All of your open pull requests</div>
                            </div>
                            <div>
                                <div className="text-2xl font-medium">Pending Review</div>
                                <div className="text-gray-500">Pull Requests that are pending your review</div>
                            </div>
                            <div>
                                <div className="text-2xl font-medium">Approved</div>
                                <div className="text-gray-500">Pull Requests that are ready to ship</div>
                            </div>
                            <div>
                                <div className="text-2xl font-medium">Changes Requested</div>
                                <div className="text-gray-500">Pull Requests that requires your attention after being reviewed by others</div>
                            </div>

                        </div>
                        <div className="mx-auto w-[640px] bg-gray-300 h-[360px] rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="container mx-auto py-20">
                    <div className="text-3xl text-center font-semibold pb-20">
                        Easily search for PRs
                    </div>
                    <div className="flex pb-8">
                        <div className="mx-auto w-[640px] bg-gray-300 h-[360px] rounded-lg animate-pulse"></div>
                        <div className="flex-1 text-center align-middle h-full">
                            Using the same query language as Github (show the dynamic text)
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white' id="Getting Started">
                <div className="container mx-auto py-20">
                    <div className="text-3xl text-center font-semibold pb-20">
                        Get Started in a single click
                    </div>
                    <div className="flex pb-8">
                        <div className="flex-1 text-center align-middle h-full">
                            Bounce button
                        </div>
                        <div className="mx-auto w-[640px] bg-gray-300 h-[360px] rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="" id="Contact Us">
                <div className="container mx-auto py-20 flex justify-between text-sm text-gray-500">
                    <Link href="https://github.com/kev-inc/shipstack" className='hover:underline'>GitHub</Link>
                    <span>Copyright 2023 © ShipStack</span>
                </div>
            </div>
        </div>
    )
}

export default Login