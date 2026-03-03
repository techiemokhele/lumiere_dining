import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth-options";
import connectDB from "@/config/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { sendOrderConfirmation } from "@/lib/send-order-confirmation";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      items,
      kitchenNotes,
      discount,
      tax,
      serviceCharge,
      subtotal,
      total,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const order = await Order.create({
      userId: user._id,
      items,
      kitchenNotes: kitchenNotes || "",
      discount: discount || 0,
      tax,
      serviceCharge,
      subtotal,
      total,
      status: "confirmed",
    });

    try {
      await sendOrderConfirmation({
        customerEmail: user.email,
        customerName: user.name,
        items,
        kitchenNotes,
        discount,
        tax,
        serviceCharge,
        subtotal,
        total,
      });
    } catch (emailError) {
      console.error("Email failed:", emailError);
    }

    return NextResponse.json({ success: true, orderId: order._id.toString() });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
