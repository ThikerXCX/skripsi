// async function DELETE(request){
//     const req = await request.json();

import { NextRequest, NextResponse } from "next/server";

//     console.log(req);

// }

export async function POST(request){
    const req = await request.json();
    console.log(req);
    return NextResponse.json({status : 200})
}
