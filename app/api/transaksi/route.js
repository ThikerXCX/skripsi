import {
  addDataWithCustomId,
  retriveData,
  retriveDataById,
  retriveTransactionByEmail,
  retriveUserByEmail,
  updateFieldById,
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
    statusCode: req.statusCode,
    status_pengiriman: req.status_pengiriman,
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
  const email = searchParams.get("email");

  if (email) {
    const res = await retriveTransactionByEmail(email);
    return NextResponse.json({ status: 200, data: res });
  }

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

export async function PUT(request) {
  try {
    const data = await request.json();
    const id = data.id;

    delete data.id;
    delete data.created_at;

    const res = await updateFieldById("transaksi", id, data);
    revalidateTag("transaksi");
    return NextResponse.json({
      status: 200,
      message: "Data berhasil di update",
      data: res,
    });
  } catch (e) {
    return NextResponse.json({
      status: false,
      statusCode: 401,
      message: e.message,
    });
  }
}
