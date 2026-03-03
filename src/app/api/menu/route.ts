import { NextResponse } from "next/server";
import { getCachedMenuData } from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getCachedMenuData();
  return NextResponse.json(data);
}
