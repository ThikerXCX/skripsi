import {
  addDataWithCustomId,
  retriveData,
  retriveDataById,
  retriveUserByEmail,
} from "@/app/lib/firebase/service";
import { serverTimestamp } from "firebase/firestore";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const req = await request.json();

  const user = await retriveUserByEmail(req.email);

  const res = await addDataWithCustomId("transaksi", req.order_id, {
    user_id: user.id,
    email: req.email,
    name: user.fullName,
    penerima: req.penerima,
    item_details: req.item_details,
    kurir: req.kurir,
    total_harga: req.total_harga,
    ongkir: req.ongkir,
    total: req.total,
    token: req.token,
    redirectUrl: req.redirectUrl,
    status: "pending",
    created_at: serverTimestamp(),
  });

  revalidateTag("transaksi");
  return NextResponse.json(res);
}
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

  const transaksi = await retriveData("transaksi");
  return NextResponse.json({ status: 200, data: transaksi });
}
