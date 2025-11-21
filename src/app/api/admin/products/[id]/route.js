import Connection from "@/app/utils/config/db";
import Products from "@/app/utils/models/Products";
import { NextResponse } from "next/server";

export async function GET(request,{ params }){
    await Connection();
    const { id } = await params;
    try{
        const product=await Products.findById(id);
        if(!product){
            return NextResponse.json({message:"Product not found"}, {status:404});
        }
        else{
            return NextResponse.json({success:true, product}, {status:200});
        }
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}