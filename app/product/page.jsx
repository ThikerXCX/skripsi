"use client";
import { useSession } from "next-auth/react";

export default function productPage() {
  let { data: session, status } = useSession();
  return <div></div>;
}
