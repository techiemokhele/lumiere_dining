import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface SendOrderConfirmationParams {
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  kitchenNotes: string;
  discount: number;
  tax: number;
  serviceCharge: number;
  subtotal: number;
  total: number;
}

function buildEmailHTML(
  isAdmin: boolean,
  params: SendOrderConfirmationParams,
): string {
  const {
    items,
    kitchenNotes,
    discount,
    tax,
    serviceCharge,
    subtotal,
    total,
    customerName,
  } = params;

  const itemRows = items
    .map(
      (item) => `
    <tr>
      <td style="padding:12px 20px;border-bottom:1px solid #e5e7eb;color:#2a1315;font-size:14px;">${item.name}</td>
      <td style="padding:12px 20px;border-bottom:1px solid #e5e7eb;color:#2a1315;font-size:14px;text-align:center;">${item.quantity}</td>
      <td style="padding:12px 20px;border-bottom:1px solid #e5e7eb;color:#2a1315;font-size:14px;text-align:right;">R${(item.price * item.quantity).toFixed(2)}</td>
    </tr>`,
    )
    .join("");

  const discountRow =
    discount > 0
      ? `
    <tr>
      <td colspan="2" style="padding:8px 20px;color:#16a34a;font-size:14px;font-weight:600;">Promo Discount (25%)</td>
      <td style="padding:8px 20px;color:#16a34a;font-size:14px;text-align:right;font-weight:600;">-R${discount.toFixed(2)}</td>
    </tr>`
      : "";

  const kitchenNotesRow = kitchenNotes
    ? `
    <tr>
      <td style="padding:20px 30px;">
        <div style="padding:15px 20px;background-color:#fef2f2;border-left:4px solid #e74a4a;border-radius:8px;">
          <p style="margin:0 0 5px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Kitchen Notes</p>
          <p style="margin:0;color:#2a1315;font-size:14px;">${kitchenNotes}</p>
        </div>
      </td>
    </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f5f5f5;">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:40px 20px;">
      <table role="presentation" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:linear-gradient(135deg,#2a1315 0%,#3d1a1d 100%);padding:40px 30px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;">Lumière Dining</h1>
            <div style="width:60px;height:3px;background-color:#e74a4a;margin:20px auto 0;"></div>
          </td>
        </tr>
        <tr>
          <td style="padding:30px 30px 20px;">
            <div style="display:inline-block;background-color:${isAdmin ? "#e74a4a" : "#16a34a"};color:#ffffff;padding:8px 20px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;">
              ${isAdmin ? "New Order Received" : "Order Confirmed"}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 30px 20px;">
            <h2 style="margin:0;color:#2a1315;font-size:24px;font-weight:600;">
              ${isAdmin ? `New order from ${customerName}` : `Thank you, ${customerName}!`}
            </h2>
            <p style="margin:10px 0 0;color:#6b7280;font-size:14px;line-height:1.5;">
              ${isAdmin ? "A new order has been placed and paid for." : "Your payment was successful. Here's a summary of your order."}
            </p>
          </td>
        </tr>
        <tr><td style="padding:0 30px;"><div style="height:1px;background-color:#e5e7eb;"></div></td></tr>
        <tr>
          <td style="padding:30px;">
            <table role="presentation" style="width:100%;border-collapse:collapse;">
              <tr style="background-color:#fef2f2;">
                <th style="padding:12px 20px;text-align:left;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Item</th>
                <th style="padding:12px 20px;text-align:center;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Qty</th>
                <th style="padding:12px 20px;text-align:right;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Total</th>
              </tr>
              ${itemRows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 30px;">
            <table role="presentation" style="width:100%;border-collapse:collapse;">
              <tr>
                <td colspan="2" style="padding:8px 20px;color:#6b7280;font-size:14px;">Subtotal</td>
                <td style="padding:8px 20px;color:#2a1315;font-size:14px;text-align:right;">R${subtotal.toFixed(2)}</td>
              </tr>
              ${discountRow}
              <tr>
                <td colspan="2" style="padding:8px 20px;color:#6b7280;font-size:14px;">Tax (8%)</td>
                <td style="padding:8px 20px;color:#2a1315;font-size:14px;text-align:right;">R${tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding:8px 20px;color:#6b7280;font-size:14px;">Service Charge (15%)</td>
                <td style="padding:8px 20px;color:#2a1315;font-size:14px;text-align:right;">R${serviceCharge.toFixed(2)}</td>
              </tr>
              <tr><td colspan="3" style="padding:8px 20px;"><div style="height:1px;background-color:#e5e7eb;"></div></td></tr>
              <tr>
                <td colspan="2" style="padding:12px 20px;color:#2a1315;font-size:18px;font-weight:700;">Total Paid</td>
                <td style="padding:12px 20px;color:#e74a4a;font-size:18px;font-weight:700;text-align:right;">R${total.toFixed(2)}</td>
              </tr>
            </table>
          </td>
        </tr>
        ${kitchenNotesRow}
        <tr>
          <td style="padding:30px;text-align:center;background-color:#f9fafb;">
            <p style="margin:0 0 10px;color:#6b7280;font-size:13px;">
              ${isAdmin ? "Order received from Lumière Dining Website" : "Questions about your order?"}
            </p>
            <p style="margin:0;color:#2a1315;font-weight:600;font-size:14px;">
              ${isAdmin ? "" : "Contact us at info@lumieredining.com"}
            </p>
            <p style="margin-top:15px;color:#9ca3af;font-size:12px;">19 Dock Road, Cape Town, 8001, South Africa</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendOrderConfirmation(
  params: SendOrderConfirmationParams,
): Promise<void> {
  const { customerEmail, items, total } = params;

  await Promise.all([
    // Admin email
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "neomokhele23@gmail.com",
      subject: `New Order - ${items.length} item(s) | R${total.toFixed(2)}`,
      html: buildEmailHTML(true, params),
    }),
    // Customer email
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `Order Confirmed - Lumière Dining | R${total.toFixed(2)}`,
      html: buildEmailHTML(false, params),
    }),
  ]);
}
