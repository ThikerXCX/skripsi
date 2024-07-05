'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function NavbarUser() {

  const pathName = usePathname();
  const disabled = pathName.startsWith('/admin');
  
  return (
    <>
      {!disabled && <div>
      <h2>navbar user</h2>
      <nav>
        <ul>
            <li>
                <Link href='/'>Home</Link>
            </li>
        </ul>
      </nav>
    </div>}
    </>
  )
}


