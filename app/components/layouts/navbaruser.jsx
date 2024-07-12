"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarUser() {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const disabledPath = ["/admin", "/login", "/register"];

  if (disabledPath.includes(pathName)) {
    return null; // or return an empty fragment <> </>
  }

  return (
    <div>
      <h2>navbar user</h2>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {status === "authenticated" ? (
            <button className="bg-red-900" onClick={() => signOut()}>
              Keluar
            </button>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </div>
  );
}
