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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailInfo = await retriveDataById("info", id);
    if (detailInfo) {
      console.log(detailInfo);
      return NextResponse.json({ status: 200, data: detailInfo });
    }
    return NextResponse.json({ status: 404, message: "data not found" });
  }

  const info = await retriveData("info");
  return NextResponse.json({ status: 200, data: info });
}

export async function POST(request) {
  const req = await request.json();
  const res = await tambahData("info", req);

  revalidateTag("info");
  return NextResponse.json(res);
}

export async function DELETE(request) {
  const req = await request.json();
  const id = req.id;
  const imageLink = req.image;

  try {
    Promise.all(
      imageLink.map(async (item) => {
        let refFile = ref(storage, item.ref);
        await deleteObject(refFile);
      })
    );

    await deleteDocById("info", id);
    revalidateTag("info");

    return NextResponse.json({
      status: 200,
      message: "info berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting info:", error);
    return NextResponse.json({
      status: 500,
      message: "Terjadi kesalahan saat menghapus",
    });
  }
}
export async function PUT(request) {
  const req = await request.json();
  const id = req.id;
  const data = {
    name: req.name,
    slug: req.slug,
    deskripsi: req.deskripsi,
    image: req.image,
  };

  const res = await updateFieldById("info", id, data);
  revalidateTag("info");
  return NextResponse.json(
    { status: 200, message: "berhasil di update" },
    { res }
  );
}
