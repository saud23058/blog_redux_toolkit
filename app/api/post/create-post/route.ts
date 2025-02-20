import { DBconnection } from "@/lib/db";
import { getUserSession } from "@/lib/getUserSession";
import { postSchema } from "@/lib/zod";
import { PostModel } from "@/model/postModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    await DBconnection();

    const body = await req.json();
    console.log(body);
    
    const validation = postSchema.safeParse(body);
 
      
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.errors },
        { status: 400 }
      );
    }


    
    const { title, description, imageUrl, category, details } = validation.data;

    const newPost = await PostModel.create({
      title,
      description,
      imageUrl,
      category,
      details,
    });
    const { id } = await getUserSession();

    await userModel.findByIdAndUpdate(id, {
      $push: { posts: newPost._id },
    });

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}
