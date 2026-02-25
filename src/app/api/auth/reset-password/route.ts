import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import connectDB from "@/config/mongodb";
import User from "@/models/User";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 3,
  maxMessages: 10,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return NextResponse.json({
        message:
          "If an account exists with that email, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const origin = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetUrl = `${origin}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

    const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Lumière Dining</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="background: linear-gradient(135deg, #2a1315 0%, #3d1a1d 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; font-family: 'Playfair Display', serif; letter-spacing: 0.5px;">Lumière Dining</h1>
                    <div style="width: 60px; height: 3px; background-color: #e74a4a; margin: 20px auto 0;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px; text-align: center;">
                    <h2 style="margin: 0 0 15px; color: #2a1315; font-size: 24px; font-weight: 600; font-family: 'Playfair Display', serif;">Password Reset</h2>
                    <p style="margin: 0 0 25px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      Hi ${user.name}, we received a request to reset your password. Click the button below to set a new password. This link expires in 1 hour.
                    </p>
                    <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background-color: #e74a4a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      Reset Password
                    </a>
                    <p style="margin: 25px 0 0; color: #9ca3af; font-size: 12px; line-height: 1.6;">
                      If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #f9fafb;">
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">Lumière Dining · 19 Dock Road, Cape Town, 8001</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset - Lumière Dining",
      html: emailHTML,
    });

    return NextResponse.json({
      message:
        "If an account exists with that email, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 },
    );
  }
}
