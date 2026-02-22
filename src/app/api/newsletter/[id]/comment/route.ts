import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { NewsletterPostModel } from "@/models/NewsletterPost";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = "neomokhele23@gmail.com";

async function sendMail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();
  const { userId, userName, userImage, text } = await req.json();
  if (!userId || !text?.trim())
    return NextResponse.json(
      { error: "userId and text required" },
      { status: 400 },
    );

  const post = await NewsletterPostModel.findOne({ id: params.id });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  post.comments.push({
    userId,
    userName,
    userImage,
    text: text.trim(),
    likes: [],
    replies: [],
  });
  await post.save();

  sendMail(
    ADMIN_EMAIL,
    `New Comment on "${post.title}"`,
    `<p><strong>${userName}</strong> commented: <em>"${text}"</em> on <strong>${post.title}</strong>.</p>`,
  ).catch(console.error);

  return NextResponse.json({ comments: post.comments });
}
