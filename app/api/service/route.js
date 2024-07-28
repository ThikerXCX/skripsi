import {
  addDataWithCustomId,
  retriveData,
  retriveDataById,
} from "@/app/lib/firebase/service";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    data.status = ["Barang Perbaikan Masuk"];
    const id = data.id;

    delete data.id;

    const res = await addDataWithCustomId("service", id, data);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({
      status: false,
      statusCode: 401,
      message: error.message,
    });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailService = await retriveDataById("service", id);
    if (detailService) {
      return NextResponse.json({ status: 200, data: detailService });
    }
    return NextResponse.json({ status: 404, message: "data not found" });
  }

  const service = await retriveData("service");
  return NextResponse.json({ status: 200, data: service });
}
