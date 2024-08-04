import {
  retriveDataBulanTertentu,
  retriveDataLaporan,
} from "@/app/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const bulan = searchParams.get("bulan");
  const tahun = searchParams.get("tahun");

  if (!tahun) {
    return NextResponse.json({
      status: 400,
      message: "Parameter tahun harus diisi",
    });
  }

  try {
    let data;
    if (bulan) {
      data = await retriveDataBulanTertentu("service", bulan, tahun);
    } else {
      data = await retriveDataLaporan("service", tahun);
    }

    return NextResponse.json({ status: 200, data: data });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error saat mengambil data",
    });
  }
}
