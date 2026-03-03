import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/config/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      if (existingUser.newsletterSubscribed) {
        return NextResponse.json(
          { error: "This email is already subscribed to our newsletter." },
          { status: 409 },
        );
      }

      existingUser.newsletterSubscribed = true;
      await existingUser.save();

      return NextResponse.json(
        {
          message: "Welcome back! You've been re-subscribed to our newsletter.",
        },
        { status: 200 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const adminEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f5f5f5;">
        <table role="presentation" style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:40px 20px;">
            <table role="presentation" style="max-width:600px;margin:0 auto;background-color:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
              <tr><td style="background:linear-gradient(135deg,#2a1315 0%,#3d1a1d 100%);padding:40px 30px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-size:32px;font-weight:700;font-family:'Playfair Display',serif;">Lumière Dining</h1>
                <div style="width:60px;height:3px;background-color:#e74a4a;margin:20px auto 0;"></div>
              </td></tr>
              <tr><td style="padding:30px;">
                <div style="display:inline-block;background-color:#e74a4a;color:#fff;padding:8px 20px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">New Subscription</div>
                <h2 style="margin:20px 0 10px;color:#2a1315;font-size:24px;">Newsletter Subscription</h2>
                <p style="color:#6b7280;font-size:14px;">Someone has subscribed to your newsletter!</p>
                <div style="padding:20px;background-color:#fef2f2;border-left:4px solid #e74a4a;border-radius:8px;margin-top:20px;">
                  <p style="margin:0 0 5px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Subscriber Email</p>
                  <a href="mailto:${email}" style="color:#e74a4a;font-size:16px;text-decoration:none;font-weight:600;">${email}</a>
                </div>
              </td></tr>
              <tr><td style="padding:30px;text-align:center;background-color:#f9fafb;">
                <p style="margin:0;color:#9ca3af;font-size:12px;">19 Dock Road, Cape Town, 8001, South Africa</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body></html>
    `;

    const subscriberEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f5f5f5;">
        <table role="presentation" style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:40px 20px;">
            <table role="presentation" style="max-width:600px;margin:0 auto;background-color:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
              <tr><td style="background:linear-gradient(135deg,#2a1315 0%,#3d1a1d 100%);padding:40px 30px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-size:32px;font-weight:700;font-family:'Playfair Display',serif;">Lumière Dining</h1>
                <div style="width:60px;height:3px;background-color:#e74a4a;margin:20px auto 0;"></div>
              </td></tr>
              <tr><td style="padding:40px 30px;text-align:center;">
                <h2 style="margin:0 0 15px;color:#2a1315;font-size:28px;font-family:'Playfair Display',serif;">Welcome to Our Newsletter!</h2>
                <p style="color:#6b7280;font-size:16px;line-height:1.6;">Thank you for subscribing. We're thrilled to have you join our culinary community.</p>
              </td></tr>
              <tr><td style="padding:0 30px 30px;">
                <h3 style="margin:0 0 15px;color:#2a1315;font-size:20px;">What to Expect</h3>
                <ul style="margin:0;padding-left:20px;color:#6b7280;font-size:15px;line-height:1.8;">
                  <li>Exclusive menu previews and seasonal specials</li>
                  <li>Chef's culinary insights and cooking tips</li>
                  <li>Priority booking for special events</li>
                  <li>Member-only promotions and offers</li>
                </ul>
              </td></tr>
              <tr><td style="padding:0 30px 30px;text-align:center;">
                <p style="margin:0 0 15px;color:#6b7280;font-size:14px;">To unsubscribe, simply log in to your account and toggle the newsletter setting off, or contact us at info@Lumièredining.com</p>
              </td></tr>
              <tr><td style="padding:30px;text-align:center;background-color:#f9fafb;">
                <p style="margin:0;color:#9ca3af;font-size:12px;">Lumière Dining · 19 Dock Road, Cape Town, 8001</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body></html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "neomokhele23@gmail.com",
      subject: "New Newsletter Subscription - Lumière Dining",
      html: adminEmailHTML,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Lumière Dining Newsletter",
      html: subscriberEmailHTML,
    });

    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 },
    );
  }
}
