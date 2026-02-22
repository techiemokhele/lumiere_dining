import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";
import User from "@/models/User";

export async function GET(
  _req: Request,
  { params }: { params: { itemName: string } },
) {
  try {
    await connectDB();
    const itemName = decodeURIComponent(params.itemName);

    const [reviews, aggregate] = await Promise.all([
      Review.find({ itemName }).sort({ createdAt: -1 }).limit(5).lean(),
      Review.aggregate([
        { $match: { itemName } },
        { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
      ]),
    ]);

    const userIds = reviews.map((r) => r.userId);
    const users = await User.find({ _id: { $in: userIds } })
      .select("_id profileImage")
      .lean();

    const userImageMap = Object.fromEntries(
      users.map((u) => [u._id.toString(), u.profileImage || ""]),
    );

    const reviewsWithLiveImages = reviews.map((r) => ({
      ...r,
      userImage: userImageMap[r.userId?.toString()] ?? "",
    }));

    const count = aggregate[0]?.count ?? 0;
    const averageRating = aggregate[0]?.avg
      ? Math.round(aggregate[0].avg * 10) / 10
      : 0;

    return NextResponse.json({
      reviews: reviewsWithLiveImages,
      count,
      averageRating,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
