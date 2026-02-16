import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "Image data is required." },
        { status: 400 },
      );
    }

    // Validate base64 image (max ~2MB)
    const sizeInBytes = (image.length * 3) / 4;
    if (sizeInBytes > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be under 2MB." },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { profileImage: image },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile image updated.",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image." },
      { status: 500 },
    );
  }
}
