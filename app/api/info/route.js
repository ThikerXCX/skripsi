import { retriveData, retriveDataById } from "@/app/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailInfo = await retriveDataById("info", id);
    if (detailInfo) {
      console.log(detailInfo);
      return NextResponse.json({ status: 200, data: detailInfo });
    }
    return NextResponse.json({ status: 404, message: "data not found" });
  }

  const info = await retriveData("info");
  return NextResponse.json({ status: 200, data: info });
}
