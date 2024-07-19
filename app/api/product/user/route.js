import { retriveProductUser } from "@/app/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET(request) {
  const products = await retriveProductUser();
  return NextResponse.json({ status: 200, data: products });
}
