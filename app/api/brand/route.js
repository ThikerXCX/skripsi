import {
  deleteDocById,
  retriveData,
  retriveDataById,
  tambahData,
  updateFieldById,
} from "@/app/lib/firebase/service";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailBrand = await retriveDataById("brand", id);
    if (detailBrand) {
      console.log(detailBrand);
      return NextResponse.json({ status: 200, data: detailBrand });
    }
    return NextResponse.json({ status: 404, message: "data not found" });
  }

  const brand = await retriveData("brand");
  return NextResponse.json({ status: 200, data: brand });
}

export async function DELETE(request) {
  try {
    const req = await request.json();
    const id = req.id;

    const res = await deleteDocById("brand", id);
    revalidateTag("brand");

    // Mengembalikan respons dengan status 200 dan pesan sukses
    return NextResponse.json({
      status: 200,
      message: "brand berhasil dihapus",
      data: res,
    });
  } catch (error) {
    console.error("Error:", error);

    // Mengembalikan respons dengan status 500 dan pesan kesalahan
    return NextResponse.json({
      status: 500,
      message: "Terjadi kesalahan saat menghapus brand",
      error: error.message,
    });
  }
}
// }

export async function POST(request) {
  try {
    const req = await request.json();
    const res = await tambahData("brand", req);

    revalidateTag("brand");

    // Mengembalikan respons dengan status 200 dan pesan sukses
    return NextResponse.json({
      status: 200,
      message: "data berhasil dimasukan",
      data: res,
    });
  } catch (error) {
    console.error("Error:", error);

    // Mengembalikan respons dengan status 500 dan pesan kesalahan
    return NextResponse.json({
      status: 500,
      message: "Terjadi kesalahan saat memasukkan data",
      error: error.message,
    });
  }
}

export async function PUT(request) {
  try {
    const req = await request.json();
    console.log(req);
    const id = req.id;
    const data = {
      name: req.name,
      slug: req.slug,
    };

    const res = await updateFieldById("brand", id, data);

    revalidateTag("brand");

    // Mengembalikan respons dengan status 200 dan pesan sukses
    return NextResponse.json({
      status: 200,
      message: "brand berhasil diupdate",
      data: res,
    });
  } catch (error) {
    console.error("Error:", error);

    // Mengembalikan respons dengan status 500 dan pesan kesalahan
    return NextResponse.json({
      status: 500,
      message: "Terjadi kesalahan saat mengupdate brand",
      error: error.message,
    });
  }
}
