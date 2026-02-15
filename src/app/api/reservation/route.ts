import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      partySize,
      reservationDate,
      seatingArea,
      availableTime,
      occasionType,
      firstName,
      lastName,
      phoneNumber,
      email,
      specialRequests,
    } = body;

    if (!firstName || !lastName || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 },
      );
    }

    const formatDate = (dateStr: string) => {
      if (!dateStr) return "N/A";
      return new Date(dateStr).toLocaleDateString("en-ZA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const seatingLabels: Record<string, string> = {
      "main-dining": "Main Dining Room",
      patio: "Patio",
      bar: "Bar High-Top",
    };

    const adminEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Reservation - Lumière Dining</title>
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
                  <td style="padding: 30px 30px 20px;">
                    <div style="display: inline-block; background-color: #e74a4a; color: #ffffff; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">New Reservation</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <h2 style="margin: 0; color: #2a1315; font-size: 24px; font-weight: 600; font-family: 'Playfair Display', serif;">Reservation Details</h2>
                    <p style="margin: 10px 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">A new reservation has been made!</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px;"><div style="height: 1px; background-color: #e5e7eb;"></div></td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 12px 20px; background-color: #fef2f2; border-left: 4px solid #e74a4a; border-radius: 8px; margin-bottom: 8px;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Guest Name</p>
                          <p style="margin: 0; color: #2a1315; font-size: 16px; font-weight: 600;">${firstName} ${lastName}</p>
                        </td>
                      </tr>
                      <tr><td style="height: 8px;"></td></tr>
                      <tr>
                        <td style="padding: 12px 20px; background-color: #fef2f2; border-left: 4px solid #e74a4a; border-radius: 8px;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Contact</p>
                          <p style="margin: 0; color: #2a1315; font-size: 14px;"><a href="mailto:${email}" style="color: #e74a4a; text-decoration: none; font-weight: 600;">${email}</a></p>
                          <p style="margin: 4px 0 0; color: #2a1315; font-size: 14px;">${phoneNumber}</p>
                        </td>
                      </tr>
                      <tr><td style="height: 8px;"></td></tr>
                      <tr>
                        <td style="padding: 12px 20px; background-color: #fef2f2; border-left: 4px solid #e74a4a; border-radius: 8px;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Reservation Info</p>
                          <p style="margin: 0; color: #2a1315; font-size: 14px;"><strong>Party Size:</strong> ${partySize} guest(s)</p>
                          <p style="margin: 4px 0 0; color: #2a1315; font-size: 14px;"><strong>Date:</strong> ${formatDate(reservationDate?.from)}</p>
                          ${reservationDate?.to ? `<p style="margin: 4px 0 0; color: #2a1315; font-size: 14px;"><strong>End Date:</strong> ${formatDate(reservationDate.to)}</p>` : ""}
                          <p style="margin: 4px 0 0; color: #2a1315; font-size: 14px;"><strong>Time:</strong> ${availableTime}</p>
                          <p style="margin: 4px 0 0; color: #2a1315; font-size: 14px;"><strong>Occasion:</strong> ${occasionType.charAt(0).toUpperCase() + occasionType.slice(1)}</p>
                          <p style="margin: 4px 0 0; color: #2a1315; font-size: 14px;"><strong>Seating:</strong> ${seatingLabels[seatingArea] || seatingArea}</p>
                        </td>
                      </tr>
                      ${
                        specialRequests
                          ? `<tr><td style="height: 8px;"></td></tr>
                        <tr>
                          <td style="padding: 12px 20px; background-color: #fef2f2; border-left: 4px solid #e74a4a; border-radius: 8px;">
                            <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Special Requests</p>
                            <p style="margin: 0; color: #2a1315; font-size: 14px;">${specialRequests}</p>
                          </td>
                        </tr>`
                          : ""
                      }
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px;"><div style="height: 1px; background-color: #e5e7eb;"></div></td>
                </tr>
                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #f9fafb;">
                    <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px; line-height: 1.6;">Reservation received from</p>
                    <p style="margin: 0; color: #2a1315; font-weight: 600; font-size: 14px;">Lumière Dining Website</p>
                    <div style="margin-top: 20px;">
                      <p style="margin: 0; color: #9ca3af; font-size: 12px;">19 Dock Road, Cape Town, 8001, South Africa</p>
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

    const guestEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reservation Confirmation - Lumière Dining</title>
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
                    <h2 style="margin: 0 0 15px; color: #2a1315; font-size: 28px; font-weight: 600; font-family: 'Playfair Display', serif;">Reservation Confirmed!</h2>
                    <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 1.6;">Thank you, ${firstName}! Your table has been reserved. We look forward to welcoming you.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px;"><div style="height: 1px; background-color: #e5e7eb;"></div></td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <h3 style="margin: 0 0 15px; color: #2a1315; font-size: 20px; font-weight: 600; font-family: 'Playfair Display', serif;">Your Reservation Details</h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>Date:</strong></td>
                        <td style="padding: 10px 0; color: #2a1315; font-size: 14px; text-align: right; border-bottom: 1px solid #e5e7eb;">${formatDate(reservationDate?.from)}</td>
                      </tr>
                      ${reservationDate?.to ? `<tr><td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>End Date:</strong></td><td style="padding: 10px 0; color: #2a1315; font-size: 14px; text-align: right; border-bottom: 1px solid #e5e7eb;">${formatDate(reservationDate.to)}</td></tr>` : ""}
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>Time:</strong></td>
                        <td style="padding: 10px 0; color: #2a1315; font-size: 14px; text-align: right; border-bottom: 1px solid #e5e7eb;">${availableTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>Party Size:</strong></td>
                        <td style="padding: 10px 0; color: #2a1315; font-size: 14px; text-align: right; border-bottom: 1px solid #e5e7eb;">${partySize} guest(s)</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>Seating:</strong></td>
                        <td style="padding: 10px 0; color: #2a1315; font-size: 14px; text-align: right; border-bottom: 1px solid #e5e7eb;">${seatingLabels[seatingArea] || seatingArea}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px;"><strong>Occasion:</strong></td>
                        <td style="padding: 10px 0; color: #2a1315; font-size: 14px; text-align: right;">${occasionType.charAt(0).toUpperCase() + occasionType.slice(1)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${
                  specialRequests
                    ? `<tr>
                  <td style="padding: 0 30px 30px;">
                    <div style="padding: 15px 20px; background-color: #fef2f2; border-radius: 8px;">
                      <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Special Requests</p>
                      <p style="margin: 0; color: #2a1315; font-size: 14px;">${specialRequests}</p>
                    </div>
                  </td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="text-align: center; padding: 20px; background-color: #fef2f2; border-radius: 8px;">
                          <p style="margin: 0 0 15px; color: #2a1315; font-size: 14px; font-weight: 600;">Visit us at</p>
                          <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">19 Dock Road<br/>Cape Town, 8001<br/>South Africa</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px;"><div style="height: 1px; background-color: #e5e7eb;"></div></td>
                </tr>
                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #f9fafb;">
                    <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px;">Need to modify or cancel your reservation?</p>
                    <p style="margin: 0 0 15px; color: #2a1315; font-weight: 600; font-size: 14px;">Contact us at info@Lumièredining.com</p>
                    <p style="margin: 0; color: #9ca3af; font-size: 11px;">Lumière Dining • 19 Dock Road, Cape Town, 8001</p>
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
      subject: `New Reservation - ${firstName} ${lastName} | ${formatDate(reservationDate?.from)} at ${availableTime}`,
      html: adminEmailHTML,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reservation Confirmed - Lumière Dining",
      html: guestEmailHTML,
    });

    return NextResponse.json(
      { message: "Reservation confirmed" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing reservation:", error);
    return NextResponse.json(
      { error: "Failed to process reservation" },
      { status: 500 },
    );
  }
}
