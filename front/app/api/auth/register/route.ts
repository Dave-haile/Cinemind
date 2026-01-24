// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { setAuthCookies } from '@/lib/auth';
import { ApiError, AuthResponse } from '@/types/api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Basic validation
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    const response = await apiClient.post<AuthResponse>('/auth/register', {
      name: body.name,
      email: body.email,
      password: body.password,
    });

    // Set cookies after successful registration
    if (response.token || response.access_token) {
      const token = response.token || response.access_token;
      if (token && response.user) {
        await setAuthCookies(token, response.user);
      }
    }

    return NextResponse.json(response, { status: 201 });

  } catch (error: unknown) {
    console.error('Registration error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Registration failed'
    const errorStatus = (error as ApiError)?.status || 400;
    const errorDetails = (error as ApiError)?.errors
    
    return NextResponse.json(
      { 
        error: errorMessage,
        ...(errorDetails && { errors: errorDetails })
      },
      { status: errorStatus || 400 }
    );
  }
}