import { NextResponse } from "next/server";
import { serverFetch } from "@/lib/server-api";

export async function GET() {
  const res = await serverFetch("/auth/me");
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
