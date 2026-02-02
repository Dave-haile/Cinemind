import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server-api";
import { setAuthToken } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await serverFetch("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // After successful verification, set auth token and redirect to login
  // Note: The backend now creates the user account during verification
  return NextResponse.json({
    success: true,
    message: data.message,
    redirect: "/login"
  });
}