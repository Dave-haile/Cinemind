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
import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { setAuthCookies } from '@/lib/auth';
import { ApiError, AuthResponse } from '@/types/api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Call Flask backend
    const response = await apiClient.post<AuthResponse>('/auth/login', body);
    
    // Set cookies from response
    if (response.token || response.access_token) {
      const token = response.token || response.access_token;
      if (token && response.user) {
        await setAuthCookies(token, response.user);
      }
    }

    // Forward Flask cookies if present
    const nextResponse = NextResponse.json(response, { status: 200 });
    
    // You can also forward specific cookies from Flask if needed
    // const setCookieHeader = req.headers.get('set-cookie');
    // if (setCookieHeader) {
    //   nextResponse.headers.set('set-cookie', setCookieHeader);
    // }

    return nextResponse;

  } catch (error: unknown) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Login failed'
    const errorStatus = (error as ApiError)?.status || 500;
    const errorDetails = (error as ApiError)?.errors
    return NextResponse.json(
      { 
        error: errorMessage || 'Login failed',
        ...(errorDetails && { errors: errorDetails })
      },
      { status: errorStatus }
    );
  }
}