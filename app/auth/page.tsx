"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const url = window.location.origin + "/api/auth/success?code=" + code;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if ("access_token" in data) {
          localStorage.setItem("ghToken", data["access_token"]);
          router.push("/");
        }
      });
  }, [code]);

  return <div>Successfully logged in, redirecting...</div>;
};

export default AuthPage;
