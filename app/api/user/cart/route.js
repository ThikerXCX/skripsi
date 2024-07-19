import { updateCartUser } from "@/app/lib/firebase/service";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const req = await request.json();
  const email = req.email;
  const carts = req.carts;

  const res = await updateCartUser(email, carts);
  revalidateTag("users");

  return NextResponse.json(
    {
      success: true,
      data: res,
    },
    200
  );
}
