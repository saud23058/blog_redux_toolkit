import { DBconnection } from "@/lib/db";
import { PostModel } from "@/model/postModel";
import { userModel } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    await DBconnection();
    const post = await PostModel.findByIdAndUpdate(
      id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    const { authorId } = post;
    const author = await userModel.findById(authorId);
    return NextResponse.json(
      {
        post,
        author,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Unable to fetch the data",
      },
      { status: 400 }
    );
  }
}
