import { NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";
export function mainMiddleware(req) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/admin",
  "/admin/brand",
  "/admin/brand/create",
  "/admin/brand/edit",
  "/admin/kategori",
  "/admin/kategori/create",
  "/admin/kategori/edit",
  "/admin/product",
  "/admin/product/create",
  "/admin/product/edit",
  "/laporan",
  "/service",
  "/login",
  "/register",
]);
