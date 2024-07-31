import {
  addDataWithCustomId,
  deleteDocById,
  retriveData,
  retriveDataById,
  updateFieldById,
} from "@/app/lib/firebase/service";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    data.status = ["Barang Perbaikan Masuk"];
    const id = data.id;

    delete data.id;

    const res = await addDataWithCustomId("service", id, data);
    revalidateTag("service");
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

export async function PUT(request) {
  try {
    const data = await request.json();
    const id = data.id;

    delete data.id;

    const res = await updateFieldById("service", id, data);
    revalidateTag("service");
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

export async function DELETE(request) {
  try {
    const req = await request.json();
    const id = req.id;

    const res = await deleteDocById("service", id);
    revalidateTag("service");

    // Mengembalikan respons dengan status 200 dan pesan sukses
    return NextResponse.json({
      status: 200,
      message: "data berhasil dihapus",
      data: res,
    });
  } catch (error) {
    console.error("Error:", error);

    // Mengembalikan respons dengan status 500 dan pesan kesalahan
    return NextResponse.json({
      status: 500,
      message: "Terjadi kesalahan saat menghapus service",
      error: error.message,
    });
  }
}
