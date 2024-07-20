import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.json();

    if (!req.kota_id || !req.berat || !req.kurir) {
      return NextResponse.json({
        status: 400,
        message: "Invalid request data",
      });
    }

    const res = await fetch(`https://api.rajaongkir.com/starter/cost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: process.env.RAJA_ONGKIR_KEY,
      },
      body: JSON.stringify({
        origin: "365",
        destination: req.kota_id,
        weight: req.berat * 1000, // Berat dalam gram
        courier: req.kurir,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({
        status: res.status,
        message: error.rajaongkir.status.description,
      });
    }

    const data = await res.json();
    return NextResponse.json({ status: 200, data: data.rajaongkir.results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
