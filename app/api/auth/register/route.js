import { register } from "@/app/lib/firebase/service";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.json();
    const res = await register(req);
    revalidateTag("users");
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
      statusCode: 500,
      error: error,
    });
  }
}
