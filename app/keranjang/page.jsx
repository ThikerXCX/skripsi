"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function KeranjangPage() {
  const { data: session } = useSession();
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    setCarts(session?.user.carts);
  }, [session]);

  console.log(carts);

  return carts.map((item) => (
    <div key={item.id} className="">
      <p>{item.name}</p>
      <p>{item.qty}</p>
    </div>
  ));
}
