import { getProvinsi } from "@/app/lib/rajaongkir";
import { NextResponse } from "next/server";

export async function GET(request) {
  const province = await getProvinsi();
  return NextResponse.json({ status: 200, data: province });
}
