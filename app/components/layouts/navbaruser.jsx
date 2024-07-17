"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function NavbarUser() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const disabledPath = ["/login", "/register"];
  const adminpage = /^\/admin\/?.*/;

  if (adminpage.test(pathName)) {
    return null; // or return an empty fragment <> </>
  }

  if (disabledPath.includes(pathName)) {
    return null; // or return an empty fragment <> </>
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Image src="/icon/EC.svg" height={50} width={50} alt="logo" />
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-md">
              <li>
                <Link
                  className={`text-gray-500 transition hover:text-gray-500/75 ${
                    pathName.startsWith("/") ? "text-gray-700" : ""
                  } `}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`text-gray-500 transition hover:text-gray-500/75 ${
                    pathName.startsWith("/produk") ? "text-gray-700" : ""
                  } `}
                  href="/product"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  className={`text-gray-500 transition hover:text-gray-500/75 ${
                    pathName.startsWith("/info") ? "text-gray-700" : ""
                  } `}
                  href="/info"
                >
                  Info & Tips
                </Link>
              </li>
              <li>
                <Link
                  className={`text-gray-500 transition hover:text-gray-500/75 ${
                    pathName.startsWith("/service") ? "text-gray-700" : ""
                  } `}
                  href="/service"
                >
                  Service
                </Link>
              </li>
              <li>
                <Link
                  className={`text-gray-500 transition hover:text-gray-500/75 ${
                    pathName.startsWith("/tentang") ? "text-gray-700" : ""
                  } `}
                  href="/tentang"
                >
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {status === "authenticated" ? (
                <>
                  <Link
                    href="/keranjang"
                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  >
                    Keranjang
                  </Link>
                  <div id="dropdown" className="relative">
                    <button
                      className="h-full flex p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {session.user.fullName}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div
                        className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                        role="menu"
                      >
                        <div className="p-2">
                          <Link
                            href="profile"
                            className="block text-center w-full rounded-lg px-4 py-2 text-sm  bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75"
                            role="menuitem"
                          >
                            Profile
                          </Link>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => {
                              signOut();
                            }}
                            className="block w-full rounded-lg px-4 py-2 text-sm  bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75"
                            role="menuitem"
                          >
                            Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                    onClick={() => {
                      signIn;
                    }}
                  >
                    Login
                  </button>

                  <Link
                    href="/register"
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
