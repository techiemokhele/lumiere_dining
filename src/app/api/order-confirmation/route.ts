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

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      items,
      kitchenNotes,
      discount,
      tax,
      serviceCharge,
      subtotal,
      total,
    } = body as {
      items: OrderItem[];
      kitchenNotes: string;
      discount: number;
      tax: number;
      serviceCharge: number;
      subtotal: number;
      total: number;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No order items" }, { status: 400 });
    }

    const itemRows = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb; color: #2a1315; font-size: 14px;">${item.name}</td>
          <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb; color: #2a1315; font-size: 14px; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb; color: #2a1315; font-size: 14px; text-align: right;">R${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`,
      )
      .join("");

    const discountRow =
      discount > 0
        ? `<tr>
            <td colspan="2" style="padding: 8px 20px; color: #16a34a; font-size: 14px; font-weight: 600;">Promo Discount (25%)</td>
            <td style="padding: 8px 20px; color: #16a34a; font-size: 14px; text-align: right; font-weight: 600;">-R${discount.toFixed(2)}</td>
          </tr>`
        : "";

    const buildEmailHTML = (isAdmin: boolean) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isAdmin ? "New Order" : "Order Confirmation"} - Lumière Dining</title>
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
                    <div style="display: inline-block; background-color: ${isAdmin ? "#e74a4a" : "#16a34a"}; color: #ffffff; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      ${isAdmin ? "New Order Received" : "Order Confirmed"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 20px;">
                    <h2 style="margin: 0; color: #2a1315; font-size: 24px; font-weight: 600; font-family: 'Playfair Display', serif;">
                      ${isAdmin ? "Order Details" : "Thank you for your order!"}
                    </h2>
                    <p style="margin: 10px 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      ${isAdmin ? "A new order has been placed and paid for." : "Your payment was successful. Here's a summary of your order."}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px;"><div style="height: 1px; background-color: #e5e7eb;"></div></td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr style="background-color: #fef2f2;">
                        <th style="padding: 12px 20px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Item</th>
                        <th style="padding: 12px 20px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Qty</th>
                        <th style="padding: 12px 20px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Total</th>
                      </tr>
                      ${itemRows}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td colspan="2" style="padding: 8px 20px; color: #6b7280; font-size: 14px;">Subtotal</td>
                        <td style="padding: 8px 20px; color: #2a1315; font-size: 14px; text-align: right;">R${subtotal.toFixed(2)}</td>
                      </tr>
                      ${discountRow}
                      <tr>
                        <td colspan="2" style="padding: 8px 20px; color: #6b7280; font-size: 14px;">Tax (8%)</td>
                        <td style="padding: 8px 20px; color: #2a1315; font-size: 14px; text-align: right;">R${tax.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 8px 20px; color: #6b7280; font-size: 14px;">Service Charge (15%)</td>
                        <td style="padding: 8px 20px; color: #2a1315; font-size: 14px; text-align: right;">R${serviceCharge.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colspan="3" style="padding: 8px 20px;"><div style="height: 1px; background-color: #e5e7eb;"></div></td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 12px 20px; color: #2a1315; font-size: 18px; font-weight: 700;">Total Paid</td>
                        <td style="padding: 12px 20px; color: #e74a4a; font-size: 18px; font-weight: 700; text-align: right;">R${total.toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${
                  kitchenNotes
                    ? `<tr>
                    <td style="padding: 20px 30px;">
                      <div style="padding: 15px 20px; background-color: #fef2f2; border-left: 4px solid #e74a4a; border-radius: 8px;">
                        <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Kitchen Notes</p>
                        <p style="margin: 0; color: #2a1315; font-size: 14px;">${kitchenNotes}</p>
                      </div>
                    </td>
                  </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #f9fafb;">
                    <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px;">
                      ${isAdmin ? "Order received from Lumière Dining Website" : "Questions about your order?"}
                    </p>
                    <p style="margin: 0; color: #2a1315; font-weight: 600; font-size: 14px;">
                      ${isAdmin ? "" : "Contact us at info@lumieredining.com"}
                    </p>
                    <p style="margin-top: 15px; color: #9ca3af; font-size: 12px;">19 Dock Road, Cape Town, 8001, South Africa</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send admin email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "neomokhele23@gmail.com",
      subject: `New Order - ${items.length} item(s) | R${total.toFixed(2)}`,
      html: buildEmailHTML(true),
    });

    // Send customer email (if provided)
    // For now send to admin since we don't have customer email in cart flow
    // We can add customer email to the checkout flow later

    return NextResponse.json(
      { message: "Order confirmation sent" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending order confirmation:", error);
    return NextResponse.json(
      { error: "Failed to send order confirmation" },
      { status: 500 },
    );
  }
}
