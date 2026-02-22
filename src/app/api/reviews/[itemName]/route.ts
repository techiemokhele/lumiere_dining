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

    const reviews = await Review.find({ itemName })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const count = await Review.countDocuments({ itemName });
    const aggregate = await Review.aggregate([
      { $match: { itemName } },
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);
    const averageRating = aggregate[0]?.avg
      ? Math.round(aggregate[0].avg * 10) / 10
      : 0;

    return NextResponse.json({ reviews, count, averageRating });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
