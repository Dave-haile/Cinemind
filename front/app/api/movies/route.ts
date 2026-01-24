import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server-api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q") || "";
    const genre = searchParams.get("genre") || "";
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const query = new URLSearchParams({
      ...(q && { q }),
      ...(genre && { genre }),
      page,
      limit,
    }).toString();

    const flaskRes = await serverFetch(`/movies?${query}`, {
      method: "GET",
    });

    const data = await flaskRes.json();

    console.log("🎬 Movies from Flask:", data);

    return NextResponse.json(data, { status: flaskRes.status });
  } catch (error) {
    console.error("❌ Movie fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 },
    );
  }
}
