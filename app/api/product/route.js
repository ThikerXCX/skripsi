import { storage } from "@/app/lib/firebase/init";
import {
  deleteDocById,
  retriveData,
  retriveDataById,
  tambahData,
} from "@/app/lib/firebase/service";
import { deleteObject, refFromUrl } from "firebase/storage";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const req = await request.json();
  const id = req.id;
  const imageLink = req.image;
  try {
    Promise.all(
      imageLink.forEach(async (item) => {
        console.log(item);
        let ref = refFromUrl(storage, item);
        console.log(ref);
        await deleteObject(ref);
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
  console.log(products);
  return NextResponse.json({ status: 200, data: products });
}
