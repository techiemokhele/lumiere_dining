import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be signed in to leave a review." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { itemName, rating, title, review } = body;

    if (!itemName || !rating || !title || !review) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const newReview = await Review.create({
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      itemName,
      rating,
      title,
      review,
    } as unknown as Record<string, unknown>);

    return NextResponse.json(
      { message: "Review submitted successfully.", review: newReview },
      { status: 201 },
    );
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review." },
      { status: 500 },
    );
  }
}
