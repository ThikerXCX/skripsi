import { retriveDataDashboard } from "@/app/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const collection = searchParams.get("koleksi");
  const bulan = searchParams.get("bulan");
  const tahun = searchParams.get("tahun");

  if (!tahun || !bulan || !collection) {
    return NextResponse.json({
      status: 400,
      message: "Parameter bulan dan tahun harus diisi",
    });
  }

  try {
    const data = await retriveDataDashboard(collection, bulan, tahun);

    return NextResponse.json({ status: 200, data: data });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error saat mengambil data",
    });
  }
}
