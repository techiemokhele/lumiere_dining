import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/mongodb";
import { NewsletterPostModel } from "@/models/NewsletterPost";
import User from "@/models/User";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  pool: true,
  maxConnections: 3,
});

async function sendMail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
}

function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f5f5f5;">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:40px 20px;">
      <table role="presentation" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:linear-gradient(135deg,#2a1315 0%,#3d1a1d 100%);padding:40px 30px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;font-family:'Playfair Display',serif;letter-spacing:0.5px;">Lumière Dining</h1>
            <div style="width:60px;height:3px;background-color:#e74a4a;margin:20px auto 0;"></div>
          </td>
        </tr>
        ${content}
        <tr>
          <td style="padding:30px;text-align:center;background-color:#f9fafb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">Lumière Dining · 19 Dock Road, Cape Town, 8001, South Africa</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function infoRow(label: string, value: string) {
  return `<tr>
    <td style="padding:12px 20px;background-color:#fef2f2;border-left:4px solid #e74a4a;border-radius:8px;">
      <p style="margin:0 0 4px;color:#6b7280;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${label}</p>
      <p style="margin:0;color:#2a1315;font-size:15px;font-weight:600;">${value}</p>
    </td>
  </tr>
  <tr><td style="height:8px;"></td></tr>`;
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

  if (comment.userId !== userId) {
    const postImageBlock = post.image
      ? `<tr><td style="padding:0 30px 20px;">
          <img src="${post.image}" alt="${post.title}" style="width:100%;border-radius:12px;object-fit:cover;max-height:220px;" />
        </td></tr>`
      : "";

    // Look up comment author's email from DB
    const commentAuthor = await User.findById(comment.userId)
      .select("email")
      .lean();
    const authorEmail = commentAuthor
      ? (commentAuthor as { email: string }).email
      : null;

    if (authorEmail) {
      const userHtml = emailWrapper(`
        <tr><td style="padding:30px 30px 20px;">
          <div style="display:inline-block;background-color:#e74a4a;color:#ffffff;padding:8px 20px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">New Reply</div>
        </td></tr>
        <tr><td style="padding:0 30px 20px;">
          <h2 style="margin:0;color:#2a1315;font-size:22px;font-weight:600;font-family:'Playfair Display',serif;">Someone replied to your comment!</h2>
          <p style="margin:10px 0 0;color:#6b7280;font-size:14px;line-height:1.6;">Your comment sparked a conversation.</p>
        </td></tr>
        ${postImageBlock}
        <tr><td style="padding:0 30px 20px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            ${infoRow("Article", post.title)}
            ${infoRow("Your Comment", comment.text)}
            ${infoRow("Reply From", userName)}
            ${infoRow("Reply", text.trim())}
          </table>
        </td></tr>
      `);

      sendMail(
        authorEmail,
        `${userName} replied to your comment`,
        userHtml,
      ).catch(console.error);
    }
  }

  return NextResponse.json({ comments: post.comments });
}
