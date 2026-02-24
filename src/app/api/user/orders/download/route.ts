import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDocument {
  _id: { toString(): string };
  items: OrderItem[];
  kitchenNotes: string;
  discount: number;
  tax: number;
  serviceCharge: number;
  subtotal: number;
  total: number;
  status: string;
  createdAt: Date;
}

function generateReceiptHTML(orders: OrderDocument[], title: string) {
  const rows = orders
    .map((order) => {
      const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const itemRows = order.items
        .map(
          (item: OrderItem) => `
      <tr>
        <td style="padding:6px 8px;border-bottom:1px solid #e5e7eb;font-size:13px;">${item.name}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e5e7eb;font-size:13px;text-align:center;">${item.quantity}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e5e7eb;font-size:13px;text-align:right;">R${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`,
        )
        .join("");

      return `
      <div style="margin-bottom:32px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <div style="background:#2a1315;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;">
          <span style="color:#fff;font-weight:700;font-size:14px;">Order #${order._id.toString().slice(-8).toUpperCase()}</span>
          <span style="color:#e74a4a;font-size:13px;">${date}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#fef2f2;">
              <th style="padding:8px;text-align:left;font-size:11px;color:#6b7280;text-transform:uppercase;">Item</th>
              <th style="padding:8px;text-align:center;font-size:11px;color:#6b7280;text-transform:uppercase;">Qty</th>
              <th style="padding:8px;text-align:right;font-size:11px;color:#6b7280;text-transform:uppercase;">Total</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
        <div style="padding:12px 16px;background:#f9fafb;border-top:1px solid #e5e7eb;">
          ${order.discount > 0 ? `<div style="display:flex;justify-content:space-between;font-size:12px;color:#16a34a;margin-bottom:4px;"><span>Discount</span><span>-R${order.discount.toFixed(2)}</span></div>` : ""}
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#6b7280;margin-bottom:4px;"><span>Tax (8%)</span><span>R${order.tax.toFixed(2)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#6b7280;margin-bottom:8px;"><span>Service Charge (15%)</span><span>R${order.serviceCharge.toFixed(2)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700;color:#2a1315;"><span>Total Paid</span><span style="color:#e74a4a;">R${order.total.toFixed(2)}</span></div>
        </div>
        ${order.kitchenNotes ? `<div style="padding:10px 16px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;"><strong>Kitchen Notes:</strong> ${order.kitchenNotes}</div>` : ""}
      </div>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>${title}</title></head>
<script>window.onload = function() { window.print(); }</script>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:700px;margin:0 auto;padding:32px;color:#2a1315;">
  <div style="text-align:center;margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #2a1315;">
    <h1 style="margin:0;font-size:28px;color:#2a1315;">Lumière Dining</h1>
    <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">19 Dock Road, Cape Town, 8001</p>
    <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">Order Receipt${orders.length > 1 ? "s" : ""}</p>
  </div>
  ${rows}
  <div style="text-align:center;margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:11px;">
    Generated on ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · info@lumieredining.com
  </div>
</body>
</html>`;
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const query: Record<string, unknown> = { userId: user._id };
    if (orderId) query._id = orderId;
    if (status) query.status = status;

    const orders = (await Order.find(query)
      .sort({ createdAt: -1 })
      .lean()) as OrderDocument[];

    if (orders.length === 0) {
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }

    const title = orderId ? "Order Receipt" : "All Orders";
    const html = generateReceiptHTML(orders, title);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to generate receipt" },
      { status: 500 },
    );
  }
}
