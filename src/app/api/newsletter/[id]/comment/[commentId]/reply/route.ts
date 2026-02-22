import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { NewsletterPostModel } from "@/models/NewsletterPost";
import nodemailer from "nodemailer";

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
  { params }: { params: { id: string; commentId: string } },
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

  const comment = post.comments.id(params.commentId);
  if (!comment)
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });

  comment.replies.push({
    userId,
    userName,
    userImage,
    text: text.trim(),
    likes: [],
  });
  await post.save();

  // Notify comment author if different from replier
  if (comment.userId !== userId) {
    sendMail(
      "neomokhele23@gmail.com",
      `New reply to a comment on your post`,
      `<p><strong>${userName}</strong> replied to <strong>${comment.userName}</strong>'s comment: "<em>${text}</em>".</p>`,
    ).catch(console.error);
  }

  return NextResponse.json({ comments: post.comments });
}
