import Link from "next/link"
import SignInWithGithubBtn from "./SignInWithGithubBtn"
import cardPic from '../images/ss-md.png'
import Image from "next/image"
import { AnimationOnScroll } from "react-animation-on-scroll"
import { TypeAnimation } from "react-type-animation"

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
                <div className="pulsing-box container mx-auto rounded-lg shadow flex flex-col p-4 items-center pt-40 pb-40">
                    <div className="text-gray-700 font-medium tracking-wider">Welcome to</div>
                    <div className="text-7xl font-bold tracking-wide">ShipStack</div>
                    <div className="text-gray-700 text-center font-medium tracking-wider pt-8 pb-8">The ultimate Github dashboard that brings all your<br />code reviews into a single, easy-to-manage view</div>
                    <SignInWithGithubBtn title="Sign In with GitHub" />
                </div>
            </div>
            <div className='bg-white' id="Features">
                <div className="container mx-auto py-20">
                    <div className="text-center pb-16">
                        <div className='text-3xl font-semibold'>The ultimate dashboard for code reviews</div>
                        <div className='text-gray-500'>Improve developer efficiency and streamline your workflow in teams and organisations</div>
                    </div>

                    <div className="flex items-center justify-center pb-8">
                        {/* <div className="flex justify-center items-center pl-20 flex-1">

                            <AnimationOnScroll animateIn="animate__fadeInLeft">
                                <div className="flex flex-col gap-y-4">
                                    <div>
                                        <div className="text-2xl font-medium">My Pull Requests</div>
                                        <div className="text-gray-500">All your code reviews at a glance</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-medium">Pending Review</div>
                                        <div className="text-gray-500">Unblock other developers when your review is requested</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-medium">Approved</div>
                                        <div className="text-gray-500">Ship your code the moment they are approved</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-medium">Changes Requested</div>
                                        <div className="text-gray-500">Review comments and make changes quickly</div>
                                    </div>

                                </div>
                            </AnimationOnScroll>
                        </div> */}
                            <AnimationOnScroll animateIn="animate__fadeIn">
                                <div className='rounded-lg border shadow-lg overflow-hidden'>
                                    <Image src={cardPic} alt="cards" className='object-contain' height={600}/>
                                </div>
                            </AnimationOnScroll>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="container mx-auto py-20">
                    <div className="text-center pb-20">
                        <div className='text-3xl font-semibold'>Easily search for PRs</div>
                        <div className='text-gray-500'>with Github&apos;s search query syntax</div>
                    </div>
                    <div className="flex pb-8">
                        <div className="flex-1 text-center align-middle h-full">
                            <TypeAnimation
                                sequence={[
                                    'is:open is:pr',
                                    200,
                                    'is:open is:pr archived:false',
                                    200,
                                    'is:open is:pr archived:false author:@me',
                                    200,
                                    'is:open is:pr archived:false review-requested:@me',
                                    1000
                                ]}
                                className='font-mono text-lg'
                                repeat={Infinity}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white' id="Getting Started">
                <div className="container mx-auto py-20">
                    <div className="text-center pb-20">
                        <div className='text-3xl font-semibold'>Seamless integration</div>
                        <div className='text-gray-500'>Integrate ShipStack into your existing Github workflow without any disruption</div>
                    </div>

                    <div className="pb-8">

                        <AnimationOnScroll animateIn="animate__zoomIn">
                            <div className="h-max items-center flex justify-center">
                                <SignInWithGithubBtn title="Try it out" />
                            </div>
                        </AnimationOnScroll>
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