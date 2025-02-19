import { DBconnection } from "@/lib/db";
import { getUserSession } from "@/lib/getUserSession";
import { PostModel } from "@/model/postModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await DBconnection();

    const { title, description, imageUrl, category, detail } = await req.json();

    const newPost = await PostModel.create({
      title,
      description,
      imageUrl,
      category,
      detail,
    });
    const { id } = await getUserSession();

    await userModel.findByIdAndUpdate(id, {
      $push: { posts: newPost._id },
    });

    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}
