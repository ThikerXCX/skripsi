import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  const tag = req.nextUrl.searchParams.get("tag");
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return NextResponse.json({ status: 404, message: "request error" });
  }
  if (!tag) {
    return NextResponse.json({ status: 400, message: "missing" });
  }
  revalidateTag(tag);
  return NextResponse.json({ revalidate: true, now: Date.now() });
}
