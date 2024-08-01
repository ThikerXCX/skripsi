import { storage } from "@/app/lib/firebase/init";
import {
  deleteDocById,
  retriveData,
  retriveDataById,
  tambahData,
  updateFieldById,
} from "@/app/lib/firebase/service";
import { deleteObject, ref } from "firebase/storage";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const req = await request.json();
  const id = req.id;
  const imageLink = req.image;
  try {
    Promise.all(
      imageLink.forEach(async (item) => {
        let refFile = ref(storage, item.ref);
        await deleteObject(refFile);
      })
    );

    await deleteDocById("products", id);
    revalidateTag("products");

    return NextResponse.json({
      status: 200,
      message: "Product berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { status: 500, message: "Terjadi kesalahan saat menghapus produk" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const req = await request.json();
  const res = await tambahData("products", req);

  revalidateTag("products");
  return NextResponse.json(res);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailProduct = await retriveDataById("products", id);
    if (detailProduct) {
      return NextResponse.json({ status: 200, data: detailProduct });
    }
    return NextResponse.json({ status: 404, message: "data not found" });
  }

  const products = await retriveData("products");
  return NextResponse.json({ status: 200, data: products });
}

export async function PUT(request) {
  const req = await request.json();
  const id = req.id;
  const data = {
    name: req.name,
    slug: req.slug,
    kategori: req.kategori,
    brand: req.brand,
    harga: req.harga,
    berat: req.berat,
    stock: req.stock,
    spesifikasi: req.spesifikasi,
    image: req.image,
  };

  const res = await updateFieldById("products", id, data);
  revalidateTag("products");
  return NextResponse.json(
    { status: 200, message: "product berhasil di update" },
    { res }
  );
}
