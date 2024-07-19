import { getKota } from "@/app/lib/rajaongkir";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const kota = await getKota(id);
  return NextResponse.json({ status: 200, data: kota });
}
