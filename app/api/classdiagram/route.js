// import { retriveDataById } from "@/app/lib/firebase/service";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const getUser = await retriveDataById("users", "e8h7uTZt4QwRI1FR0Q3u");
//   const getBrand = await retriveDataById("brand", "0e8Lc2n5IC5ZflXiqJjx");
//   const getInfo = await retriveDataById("info", "g4FK8SkrCDVc6h0rP9h4");
//   const getKategori = await retriveDataById("kategori", "BQ8UkZmtp2aFVjhIi0XY");
//   const getProducts = await retriveDataById("products", "kXw44TFPGTh6LgSFAPQs");
//   const getService = await retriveDataById("service", "ECPFYML");
//   const getTransaksi = await retriveDataById(
//     "transaksi",
//     "EC-2c200990-3cb1-451b-9542-86c6dc230e57"
//   );

//   return NextResponse.json({
//     User: getUser,
//     Brand: getBrand,
//     Kategori: getKategori,
//     Products: getProducts,
//     Service: getService,
//     Transaksi: getTransaksi,
//     Info: getInfo,
//   });
// }
