import { NextResponse } from "next/server";
import crypto from "crypto";
import { retriveDataById, updateFieldById } from "@/app/lib/firebase/service";

export async function POST(request) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
  } = await request.json();

  const dataToHash = `${order_id}${status_code}${gross_amount}${serverKey}`;
  const hash = crypto.createHash("sha512");
  hash.update(dataToHash);
  const hashedData = hash.digest("hex");

  const data = {
    status: transaction_status,
  };
  console.log(data);
  if (signature_key === hashedData) {
    await updateFieldById("transaksi", order_id, data);
    if (transaction_status === "settlement") {
      const { item_details } = await retriveDataById("transaksi", order_id);
      console.log(item_details);
    }
  }

  return NextResponse.json({ hashedData });
}
