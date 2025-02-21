import { DBconnection } from "@/lib/db";
import { PostModel } from "@/model/postModel";
import { userModel } from "@/model/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await DBconnection();
    const posts = await PostModel.find();

    const authorWithPost = await Promise.all(
      posts.map(async (p) => {
        const author = await userModel.findById(p.authorId);
        return {
          ...p.toObject(), 
          author,
        };
      })
    );

    return NextResponse.json({
      authorWithPost,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Unable to fetch the data",
      },
      { status: 400 }
    );
  }
}
