import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { noHp, message, schedule } = await request.json();

    if (!noHp || !message) {
      NextResponse.json({ error: "No HP dan pesan harus diisi" });
      return;
    }

    const data = new FormData();
    data.append("target", noHp);
    data.append("message", message);
    data.append("schedule", schedule);
    data.append("delay", "2");
    data.append("countryCode", "62");

    const res = await fetch(`https://api.fonnte.com/send`, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_TOKEN_FONNTE,
      },
      body: data,
    });
    const response = await res.json();

    return NextResponse.json({
      status: "200",
      data: response,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Terjadi kesalahan saat mengirimkan pesan",
    });
  }
}
