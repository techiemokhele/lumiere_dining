import { NextResponse } from "next/server";
import { connectDB } from "@/config/mongodb";
import { ShopCategory } from "@/models/ecommerce/ShopCategory";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const data = await ShopCategory.find({}).lean();
  return NextResponse.json(data);
}
