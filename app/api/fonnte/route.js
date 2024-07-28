import { NextResponse } from "next/server";

export async function POST(request) {
  const { noHp, message } = await request.json();

  const data = new FormData();
  data.append("target", noHp);
  data.append("message", message);
  data.append("schedule", "0");
  data.append("delay", "2");
  data.append("countryCode", "62");

  const res = await fetch(`https://api.fonnte.com/send`, {
    method: "POST",
    headers: {
      Authorization: process.env.TOKEN_FONNTE,
    },
    body: data,
  });
  const response = await res.json();
  NextResponse.json(response);
}
