"use client";
import { useSession } from "next-auth/react";

export default function ProductPage() {
  let { data: session, status } = useSession();
  return <div></div>;
}
