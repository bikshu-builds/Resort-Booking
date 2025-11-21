import Connection from "@/app/utils/config/db";
import User from "@/app/utils/models/User";
import { NextResponse } from "next/server";

export async function GET(request,{ params }){
    await Connection();
    const { id } = await params;
    try{
        const user=await User.findById(id,{password:0}).populate("bookings");
        if(!user){
            return NextResponse.json({message:"User not found"}, {status:404});
        }
        else{
            return NextResponse.json({success:true, user}, {status:200});
        }
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}