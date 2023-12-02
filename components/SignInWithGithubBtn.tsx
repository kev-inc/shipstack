import Link from "next/link";
import { GithubIcon } from "./Icons";

const SignInWithGithubBtn = ({title}: {title: string}) => (
    <Link href="/api/auth" className="inline-flex gap-x-2 items-center bg-black text-white font-semibold px-4 py-2 rounded">
        <GithubIcon />
        <span>{title}</span>
    </Link>
)

export default SignInWithGithubBtn