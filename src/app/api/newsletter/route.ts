import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Newsletter Subscription - Lumiere Dining</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <tr>
                  <td style="background: linear-gradient(135deg, #2a1315 0%, #3d1a1d 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; font-family: 'Playfair Display', serif; letter-spacing: 0.5px;">
                      Lumière Dining
                    </h1>
                    <div style="width: 60px; height: 3px; background-color: #e74a4a; margin: 20px auto 0;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 30px 30px 20px;">
                    <div style="display: inline-block; background-color: #e74a4a; color: #ffffff; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      New Subscription
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 30px 30px;">
                    <h2 style="margin: 0; color: #2a1315; font-size: 24px; font-weight: 600; font-family: 'Playfair Display', serif;">
                      Newsletter Subscription
                    </h2>
                    <p style="margin: 10px 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      Someone has subscribed to your newsletter!
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 30px;">
                    <div style="height: 1px; background-color: #e5e7eb;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 30px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 20px; background-color: #fef2f2; border-left: 4px solid #e74a4a; border-radius: 8px;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            Subscriber Email
                          </p>
                          <p style="margin: 0;">
                            <a href="mailto:${email}" style="color: #e74a4a; font-size: 16px; text-decoration: none; font-weight: 600;">
                              ${email}
                            </a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 30px;">
                    <div style="height: 1px; background-color: #e5e7eb;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #f9fafb;">
                    <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px; line-height: 1.6;">
                      Subscription received from
                    </p>
                    <p style="margin: 0; color: #2a1315; font-weight: 600; font-size: 14px;">
                      Lumière Dining Website
                    </p>
                    <div style="margin-top: 20px;">
                      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                        19 Dock Road, Cape Town, 8001, South Africa
                      </p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const subscriberEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Lumiere Dining Newsletter</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <tr>
                  <td style="background: linear-gradient(135deg, #2a1315 0%, #3d1a1d 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; font-family: 'Playfair Display', serif; letter-spacing: 0.5px;">
                      Lumière Dining
                    </h1>
                    <div style="width: 60px; height: 3px; background-color: #e74a4a; margin: 20px auto 0;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px 30px; text-align: center;">
                    <h2 style="margin: 0 0 15px; color: #2a1315; font-size: 28px; font-weight: 600; font-family: 'Playfair Display', serif;">
                      Welcome to Our Newsletter!
                    </h2>
                    <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                      Thank you for subscribing to Lumière Dining's newsletter. We're thrilled to have you join our culinary community.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 30px;">
                    <div style="height: 1px; background-color: #e5e7eb;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 30px;">
                    <h3 style="margin: 0 0 15px; color: #2a1315; font-size: 20px; font-weight: 600; font-family: 'Playfair Display', serif;">
                      What to Expect
                    </h3>
                    <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 15px; line-height: 1.8;">
                      <li>Exclusive menu previews and seasonal specials</li>
                      <li>Chef's culinary insights and cooking tips</li>
                      <li>Priority booking for special events</li>
                      <li>Member-only promotions and offers</li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 30px 30px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="text-align: center; padding: 20px; background-color: #fef2f2; border-radius: 8px;">
                          <p style="margin: 0 0 15px; color: #2a1315; font-size: 14px; font-weight: 600;">
                            Visit us at
                          </p>
                          <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                            19 Dock Road<br/>
                            Cape Town, 8001<br/>
                            South Africa
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 30px;">
                    <div style="height: 1px; background-color: #e5e7eb;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #f9fafb;">
                    <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px; line-height: 1.6;">
                      You're receiving this because you subscribed to our newsletter at
                    </p>
                    <p style="margin: 0 0 15px; color: #2a1315; font-weight: 600; font-size: 14px;">
                      lumieredining.com
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                      If you wish to unsubscribe, please contact us at info@lumieredining.com
                    </p>
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
      to: "neomokhele23@gmail.com",
      subject: "New Newsletter Subscription - Lumiere Dining",
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
