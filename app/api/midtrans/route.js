import { NextResponse } from "next/server";

const Midtrans = require("midtrans-client");

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function POST(request) {
  const req = await request.json();

  const updateCart = req.item_details.map((item) => ({
    id: item.product_id,
    name: item.name,
    quantity: item.qty,
    price: item.harga,
  }));
  const cartWithOngkir = [
    ...updateCart,
    {
      id: req.ongkir.service,
      name: req.ongkir.description,
      quantity: 1,
      price: req.ongkir.cost[0].value,
    },
  ];

  const parameter = {
    transaction_details: {
      order_id: req.order_id,
      gross_amount: req.gross_amount,
    },
    item_details: cartWithOngkir,
    customer_details: {
      first_name: req.nama_penerima,
      email: req.email,
      phone: req.no_hp_penerima,
      billing_address: {
        first_name: req.nama_penerima,
        email: req.email,
        phone: req.no_hp_penerima,
        address: req.alamat_lengkap,
        postal_code: req.kode_pos,
      },
      shipping_address: {
        first_name: req.nama_penerima,
        email: req.email,
        phone: req.no_hp_penerima,
        address: req.alamat_lengkap,
        postal_code: req.kode_pos,
      },
    },
  };
  try {
    const transaction = await snap.createTransaction(parameter);
    const token = transaction.token;
    const redirectUrl = transaction.redirect_url;
    return NextResponse.json({
      status: "success",
      statusCode: 201,
      token,
      redirectUrl,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      statusCode: 500,
      message: error.message,
    });
  }
}
