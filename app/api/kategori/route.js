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
    const detailKategori = await retriveDataById("kategori", id);
    if (detailKategori) {
      console.log(detailKategori);
      return NextResponse.json({ status: 200, data: detailKategori });
    }
    return NextResponse.json({ status: 404, message: "data not found" });
  }

  const products = await retriveData("kategori");
  return NextResponse.json({ status: 200, data: products });
}

export async function POST(request) {
  const req = await request.json();
  const res = await tambahData("kategori", req);

  revalidateTag("kategori");
  console.log(res);

  return NextResponse.json(res);
}

export async function DELETE(request) {
  const req = await request.json();
  const id = req.id;

  const res = await deleteDocById("kategori", id);
  revalidateTag("kategori");
  return NextResponse.json(
    { status: 200, message: "kategori berhasil di hapus" },
    { res }
  );
}

export async function PUT(request) {
  const req = await request.json();
  console.log(req);
  const id = req.id;
  const data = {
    name: req.name,
    slug: req.slug,
  };

  const res = await updateFieldById("kategori", id, data);

  revalidateTag("kategori");
  return NextResponse.json(
    { status: 200, message: "Kategori berhasil di update" },
    { res }
  );
}
