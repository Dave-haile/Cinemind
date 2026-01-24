import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server-api";
import { setAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await serverFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  await setAuthToken(data.access_token);
  return NextResponse.json({ success: true });
}
