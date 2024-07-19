"use client";
import { useSession } from "next-auth/react";

export default function KeranjangPage() {
  const { data: session } = useSession();
  return <div></div>;
}
