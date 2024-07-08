import { deleteDocById, retriveData, retriveDataById } from "@/app/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request){
    const req = await request.json();
     const id = req.id;

     console.log(id);

    const res = await deleteDocById('products',id);
    console.log(res);
    return NextResponse.json({status : 200,message : "product berhasil di hapus"},{res})
}

export async function POST(request){
    const req = await request.json();
    console.log(req);
    return NextResponse.json({status : 200})
}

export async function GET(request){
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const detailProduct = await retriveDataById('products',id);
        if(detailProduct){
            return NextResponse.json({ status: 200, data : detailProduct });
          }
          return NextResponse.json({ status: 404, message : "data not found" });
    }

    const products = await retriveData('products');
    console.log(products);
    return NextResponse.json({ status: 200, data : products });
}