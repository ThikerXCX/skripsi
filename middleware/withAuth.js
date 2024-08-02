import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const onlyAdmin = [
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
  "/admin/laporan",
  "/admin/service",
];
const authPage = ["/login", "/register"];

export default function withAuth(middleware, requiredAuth = []) {
  return async (req, next) => {
    const pathName = req.nextUrl.pathname;

    if (requiredAuth.includes(pathName)) {
      const token = await getToken({
        req,
        secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
      });
      if (!token && !authPage.includes(pathName)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      if (token) {
        if (authPage.includes(pathName)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        if (!token.role && onlyAdmin.includes(pathName)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }

    return middleware(req, next);
  };
}
