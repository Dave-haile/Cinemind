// // app/api/auth/login/route.ts
// import { NextResponse } from "next/server";
// import { API_BASE_URL } from "@/lib/config";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     // Validate request body
//     if (!body.email || !body.password) {
//       return NextResponse.json(
//         { error: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     const res = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: data.error || 'Login failed' },
//         { status: res.status }
//       );
//     }

//     return NextResponse.json(data, {
//       status: res.status,
//       headers: {
//         // Forward any cookies from Flask
//         'Set-Cookie': res.headers.get('set-cookie') || '',
//       }
//     });

//   } catch (error) {
//     console.error('Login API error:', error);

//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { apiClient } from "@/lib/api-client";

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const response = await apiClient.post('/auth/login', body);

//         return NextResponse.json(response, { status: 200 });
//     } catch (error: any) {
//         console.error('Login error:', error);

//         return NextResponse.json(
//             { error: error.message || 'Login failed' },
//             { status: error.status || 500 }
//         );
//     }
// }
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server-api";
import { setAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await serverFetch("/auth/login", {
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
