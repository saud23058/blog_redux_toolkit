import { auth, signIn } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="w-full flex justify-between px-8 py-4 items-center">
      <Link href={"/"}>
        <Image src="/Logo.png" alt="Logo" width={144} height={33} />
      </Link>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <button className="font-bold">
              <Link href="/post/create-post">create</Link>
            </button>

            <Link
              href={`post/author-details/${session.user.id}`}
              className="h-12 w-12 flex justify-center items-center bg-blue-300 rounded-full overflow-hidden"
            >
              <Image
                src={session?.user?.image || ""}
                alt="User Profile"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />

              <span className="font-bold text-white text-lg"></span>
            </Link>
          </>
        ) : (
          <>
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/" });
              }}
            >
              <button className="bg-black text-white p-2 rounded-md font-semibold w-max">
                Register through Github
              </button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
 