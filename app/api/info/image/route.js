import { updateFieldById } from "@/app/lib/firebase/service";
import { revalidateTag } from "next/cache";

export async function DELETE(request) {
  const req = await request.json();
  const { id } = req;
  const deletedImage = req.image;

  const data = {
    image: deletedImage,
  };

  const res = await updateFieldById("info", id, data);
  revalidateTag("info");
  return NextResponse.json(
    { status: 200, message: "gambar berhasil di hapus" },
    { res }
  );
}
