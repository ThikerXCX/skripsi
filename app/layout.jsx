import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavbarUser from "./components/layouts/navbaruser";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EC Computer",
  icons: {
    icon: "/favicon.ico",
  },
  description: "toko jual beli laptop,service laptop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <NavbarUser />
        {children}
      </body>
    </html>
  );
}
