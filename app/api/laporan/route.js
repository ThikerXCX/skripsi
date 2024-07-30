import {
  retriveDataById,
  retriveDataLaporan,
} from "@/app/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailtransaksi = await retriveDataById("transaksi", id);
    if (detailtransaksi) {
      console.log(detailtransaksi);
      return NextResponse.json({ status: 200, data: detailtransaksi });
    }
    return NextResponse.json({ status: 404, message: "data not found" });
  }

  const transaksi = await retriveDataLaporan();
  return NextResponse.json({ status: 200, data: transaksi });
}
