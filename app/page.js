import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/option";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
        {session ? (
          <div>
            <h1 className="text-2xl text-white">Welcome {session.user.name}</h1>
            <Link href="/api/auth/signout">Sign Out</Link>
          </div>
        ) : (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
      </div>
    </>
  );
}
