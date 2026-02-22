import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { NewsletterPostModel } from "@/models/NewsletterPost";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();
  const post = await NewsletterPostModel.findOne({ id: params.id }).lean();
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}
