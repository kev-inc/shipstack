import Link from "next/link";
import { GithubIcon } from "./Icons";

const SignInWithGithubBtn = () => (
    <Link href="/api/auth" className="bg-black text-white font-semibold px-4 py-2 rounded flex items-center gap-x-2">
        <GithubIcon />
        <span>Sign in with Github</span>
    </Link>
)

export default SignInWithGithubBtn