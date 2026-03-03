import { NextResponse } from "next/server";
import { getCachedShopData } from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getCachedShopData();
  return NextResponse.json(data);
}
