import Link from "next/link";
import { db } from "~/server/db";
import {LoginButton} from "@/components/login-button";


export default async function Home() {
  const users = await db.user.findMany();;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <LoginButton>
        <button>Login</button>
      </LoginButton>
    </main>
  );
}


