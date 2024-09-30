"use client";
import Container from "@/components/common/container/Container";
import Section from "@/components/common/section/Section";
import Spiner from "@/components/common/Spiner/Spiner";
import HomePage from "@/components/HomePage/HomePage";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <>
          {session.user && (
            <HomePage name={session.user.name as string}>
              <button
                className=""
                onClick={() => {
                  signOut({ redirect: false }).then(() => {
                    router.push("/");
                  });
                }}
              >
                Sign Out
              </button>
            </HomePage>
          )}
        </>
      );
    } else if (status === "loading") {
      return <Spiner />;
    } else {
      return (
        <Section>
          <Container>
            <h1>You are not logined!!! Please follow next link</h1>

            <Link href="/login" className="">
              Sign In
            </Link>
          </Container>
        </Section>
      );
    }
  };
  return <main>{showSession()}</main>;
}
