import Link from "next/link";
import { db } from "~/server/db";


export default async function Home() {
  const users = await db.user.findMany();;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {users.map((user) => (
        <Link key={user.email} href={`/user/${user.id}`}>
          {user.id}
        </Link>
      ))}
    </main>
  );
}


