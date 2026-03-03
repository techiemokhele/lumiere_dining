import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth-options";
import connectDB from "@/config/mongodb";
import User from "@/models/User";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "avatars",
      transformation: [
        { width: 200, height: 200, crop: "fill", gravity: "face" },
      ],
    });

    await connectDB();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { profileImage: uploaded.secure_url },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile image updated.",
      profileImage: uploaded.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image." },
      { status: 500 },
    );
  }
}
