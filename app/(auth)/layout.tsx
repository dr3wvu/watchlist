import Header from "@/components/Header";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/betterauth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/icons/Watchlist.svg"
            alt="Watchlist logo"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      <section className="auth-right-section relative hidden lg:block overflow-hidden">
        <Image
          src="/market-homepage.png"
          alt="Dashboard Preview"
          fill
          priority
          className="object-cover object-left"
        />
      </section>
    </main>
  );
};

export default layout;
