import { DBconnection } from "@/lib/db";
import { PostModel } from "@/model/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const  query  = await req.json(); 
  

    console.log(query);
    
    
    await DBconnection();

    
    const posts = await PostModel.find({
      title: { $regex: query, $options: "i" }
    });

    return NextResponse.json(
      { posts }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error occurred while searching: ${error}` },
      { status: 400 }
    );
  }
}
