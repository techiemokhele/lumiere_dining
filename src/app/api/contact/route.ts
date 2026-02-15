import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, subject, message } = body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission - Lumière Dining</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header with gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2a1315 0%, #3d1a1d 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; font-family: 'Playfair Display', serif; letter-spacing: 0.5px;">
                      Lumière Dining
                    </h1>
                    <div style="width: 60px; height: 3px; background-color: #e74a4a; margin: 20px auto 0;"></div>
                  </td>
                </tr>

                <!-- Badge Section -->
                <tr>
                  <td style="padding: 30px 30px 20px;">
                    <div style="display: inline-block; background-color: #e74a4a; color: #ffffff; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      New Message
                    </div>
                  </td>
                </tr>

                <!-- Title -->
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <h2 style="margin: 0; color: #2a1315; font-size: 24px; font-weight: 600; font-family: 'Playfair Display', serif;">
                      Contact Form Submission
                    </h2>
                    <p style="margin: 10px 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      You've received a new message from your website contact form.
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 0 30px;">
                    <div style="height: 1px; background-color: #e5e7eb;"></div>
                  </td>
                </tr>

                <!-- Contact Details -->
                <tr>
                  <td style="padding: 30px;">
                    <!-- From -->
                    <table role="presentation" style="width: 100%; margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 15px; background-color: #fef2f2; border-left: 4px solid #e74a4a; border-radius: 8px;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            From
                          </p>
                          <p style="margin: 0; color: #2a1315; font-size: 16px; font-weight: 600;">
                            ${fullName}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Email -->
                    <table role="presentation" style="width: 100%; margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            Email Address
                          </p>
                          <p style="margin: 0;">
                            <a href="mailto:${email}" style="color: #e74a4a; font-size: 15px; text-decoration: none; font-weight: 500;">
                              ${email}
                            </a>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Subject -->
                    <table role="presentation" style="width: 100%; margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            Subject
                          </p>
                          <p style="margin: 0; color: #2a1315; font-size: 15px; font-weight: 600;">
                            ${subject}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 20px; background-color: #2a1315; border-radius: 8px;">
                          <p style="margin: 0 0 10px; color: rgba(255, 255, 255, 0.6); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            Message
                          </p>
                          <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.7;">
                            ${message.replace(/\n/g, "<br>")}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Reply Button -->
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="text-align: center; padding: 20px 0;">
                          <a href="mailto:${email}" style="display: inline-block; background-color: #e74a4a; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.3px;">
                            Reply to ${fullName.split(" ")[0]}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 0 30px;">
                    <div style="height: 1px; background-color: #e5e7eb;"></div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #f9fafb;">
                    <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px; line-height: 1.6;">
                      This message was sent via the contact form on
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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "neomokhele23@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: emailHTML,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
