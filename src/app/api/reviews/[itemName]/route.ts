import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET(
  _req: Request,
  { params }: { params: { itemName: string } },
) {
  try {
    await connectDB();
    const itemName = decodeURIComponent(params.itemName);

    const [reviews, count] = await Promise.all([
      Review.find({ itemName }).sort({ createdAt: -1 }).limit(5).lean(),
      Review.countDocuments({ itemName }),
    ]);

    return NextResponse.json({ reviews, count });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
