import Link from "next/link"
import { GithubIcon } from "./Icons"


const Login = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className="bg-white rounded-lg shadow w-64 h-96 mt-20 flex flex-col justify-center items-center">
                <div className="text-gray-700 font-medium tracking-wider">Welcome to</div>
                <div className="text-4xl font-bold tracking-wide mb-20">ShipStack</div>
                <Link href="/api/auth" className="bg-black text-white font-semibold px-4 py-2 rounded flex items-center gap-x-2">
                    <GithubIcon/>
                    <span>Sign in with Github</span>
                </Link>
            </div>
        </div>
    )
}

export default Login