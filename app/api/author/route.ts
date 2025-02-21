import { DBconnection } from "@/lib/db";
import { PostModel } from "@/model/postModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")?.trim();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await DBconnection();
    const author = await userModel.findById(id);

    if (!author) {
      return NextResponse.json({ message: "Author not found" }, { status: 404 });
    }


    const posts = await PostModel.find({ _id: { $in: author.posts } });

    return NextResponse.json(
      {
        author: {
          _id: author._id,
          email: author.email,
          createdAt: author.createdAt,
          posts, 
        },
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Failed to get author details",
      },
      {
        status: 500,
      }
    );
  }
}
