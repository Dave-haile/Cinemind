// import { NextResponse } from "next/server";
// import { serverFetch } from "@/lib/server-api";

// console.log("me");
// export async function GET() {
//   const res = await serverFetch("/auth/me");
//   const data = await res.json();

//   console.log(data);

//   return NextResponse.json(data, { status: res.status });
// }
import { NextResponse } from "next/server";
import { serverFetch } from "@/lib/server-api";
import { getAuthToken } from "@/lib/auth-server";

export async function GET() {
  try {
    const token = await getAuthToken();
    console.log("🔐 Token from cookie:", token);

    const res = await serverFetch("/user/me");
    const text = await res.text(); // use text first to catch Flask errors

    console.log("📡 Flask /user/me status:", res.status);
    console.log("📦 Flask /user/me raw:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("❌ /api/auth/me crashed:", err);
    return NextResponse.json({ error: "Internal error in auth/me" }, { status: 500 });
  }
}
