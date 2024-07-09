import { retriveData, retriveDataById, tambahData } from "@/app/lib/firebase/service";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request){
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const detailKategori = await retriveDataById('kategori',id);
        if(detailKategori){
            console.log(detailKategori);
            return NextResponse.json({ status: 200, data : detailKategori });
          }
          return NextResponse.json({ status: 404, message : "data not found" });
    }

    const products = await retriveData('kategori');
    console.log(products);
    return NextResponse.json({ status: 200, data : products });
}

export async function POST(request){
    const req = await request.json();
    const res = await tambahData("kategori",req);

    revalidateTag("kategori")
    console.log(res);

    return NextResponse.json(res)
}