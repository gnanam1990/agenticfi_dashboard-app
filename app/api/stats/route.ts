import { NextResponse } from "next/server";
import { getEcosystemStats } from "@/lib/aggregation";

export async function GET() {
  const stats = await getEcosystemStats();
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
