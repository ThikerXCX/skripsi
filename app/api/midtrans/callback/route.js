import { NextResponse } from "next/server";
import crypto from "crypto";
import { retriveDataById, updateFieldById } from "@/app/lib/firebase/service";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
  } = await request.json();

  // Buat hash untuk verifikasi
  const dataToHash = `${order_id}${status_code}${gross_amount}${serverKey}`;
  const hash = crypto.createHash("sha512");
  hash.update(dataToHash);
  const hashedData = hash.digest("hex");

  // Verifikasi signature
  if (signature_key === hashedData) {
    // Update status transaksi
    const updateData = { status: transaction_status };
    await updateFieldById("transaksi", order_id, updateData);

    // Jika status transaksi adalah settlement, update stok produk
    if (transaction_status === "settlement") {
      try {
        const { item_details } = await retriveDataById("transaksi", order_id);

        // Gunakan Promise.all untuk menunggu semua update stok selesai
        await Promise.all(
          item_details.map(async (item) => {
            const product = await retriveDataById("products", item.product_id);
            const updatedStock = parseInt(product.stock) - item.qty;

            // Pastikan updateFieldById menerima data yang benar
            await updateFieldById("products", item.product_id, {
              stock: updatedStock,
            });
          })
        );
        revalidateTag("products");
        revalidateTag("productsUser");
      } catch (error) {
        console.error("Error updating stock:", error);
        return NextResponse.json({
          status: false,
          message: "Error updating stock",
        });
      }
    }

    return NextResponse.json({ status: true });
  } else {
    return NextResponse.json({ status: false, message: "Invalid signature" });
  }
}
