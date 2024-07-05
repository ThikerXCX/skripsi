'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarAdmin() {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div className="flex h-screen border-slate-200 flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <span className="grid h-10 w-48 place-content-center rounded-lg bg-gray-300 text-xl font-bold text-gray-600">
          EC COMPUTER
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <Link
              href="/admin"
              className={`${pathName === '/admin' ? 'bg-slate-300' : ''} block rounded-lg px-4 py-2 text-sm font-medium text-gray-700`}
            >
              Dashboard
            </Link>
          </li>


          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Account </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Details
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Security
                  </a>
                </li>

                <li>
                  <form action="#">
                    <button
                      type="submit"
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <Link
              href="/"
              className=" hover:bg-slate-300 block rounded-lg px-4 py-2 text-sm font-medium text-gray-700"
            >
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
