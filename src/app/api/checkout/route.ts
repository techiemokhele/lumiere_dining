import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      items,
      kitchenNotes,
      discount,
      tax,
      serviceCharge,
      subtotal,
    } = body;

    const amountInCents = Math.round(amount * 100);

    if (amountInCents < 200) {
      return NextResponse.json(
        { error: "Minimum payment is R2.00" },
        { status: 400 },
      );
    }

    const lineItems = items.map(
      (item: { name: string; quantity: number; price: number }) => ({
        displayName: item.name,
        quantity: item.quantity,
        pricingDetails: {
          price: Math.round(item.price * 100),
        },
      }),
    );

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const response = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: "ZAR",
        successUrl: `${origin}/my-cart/checkout/success`,
        cancelUrl: `${origin}/my-cart/checkout`,
        failureUrl: `${origin}/my-cart/checkout/failure`,
        lineItems,
        totalDiscount: Math.round((discount || 0) * 100),
        totalTaxAmount: Math.round((tax || 0) * 100),
        subtotalAmount: Math.round((subtotal || 0) * 100),
        metadata: {
          kitchenNotes: kitchenNotes || "",
          serviceCharge: Math.round((serviceCharge || 0) * 100),
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to create checkout" },
        { status: response.status },
      );
    }

    return NextResponse.json({
      checkoutId: data.id,
      redirectUrl: data.redirectUrl,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
