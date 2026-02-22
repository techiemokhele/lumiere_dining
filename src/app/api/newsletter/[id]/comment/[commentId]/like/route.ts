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
  const { userId, userName } = await req.json();
  const post = await NewsletterPostModel.findOne({ id: params.id });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const comment = post.comments.id(params.commentId);
  if (!comment)
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });

  const alreadyLiked = comment.likes.includes(userId);
  if (alreadyLiked) {
    comment.likes = comment.likes.filter((id: string) => id !== userId);
  } else {
    comment.likes.push(userId);
    // Notify comment author if different from liker
    if (comment.userId !== userId) {
      // We don't store emails per comment, so we notify admin as proxy
      // If you store user emails, replace ADMIN_EMAIL with comment author's email
      sendMail(
        "neomokhele23@gmail.com",
        `Your comment was liked`,
        `<p><strong>${userName}</strong> liked <strong>${comment.userName}</strong>'s comment: "<em>${comment.text}</em>".</p>`,
      ).catch(console.error);
    }
  }

  await post.save();
  return NextResponse.json({ likes: comment.likes });
}
