import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server-api";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await serverFetch("/auth/resend-code", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json({ success: true, message: data.message });
}