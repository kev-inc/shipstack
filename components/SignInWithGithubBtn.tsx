import Link from "next/link";
import { GithubIcon } from "./Icons";

const SignInWithGithubBtn = () => (
    <Link href="/api/auth" className="inline-flex gap-x-2 items-center bg-black text-white font-semibold px-4 py-2 rounded">
        <GithubIcon />
        <span>Sign in with Github</span>
    </Link>
)

export default SignInWithGithubBtn