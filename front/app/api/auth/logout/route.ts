import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { COOKIE_OPTIONS } from '@/lib/config';

export async function POST() {
  try {
    await apiClient.post('/auth/logout', {});

    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    response.cookies.set('auth_token', '', {
      ...COOKIE_OPTIONS,
      maxAge: 0,
      expires: new Date(0),
    });
    return response;

  } catch (error: unknown) {
    console.error('Logout error:', error);

    const response = NextResponse.json(
      { error: 'Logged out locally' },
      { status: 200 }
    );
    response.cookies.set('auth_token', '', {
      ...COOKIE_OPTIONS,
      maxAge: 0,
      expires: new Date(0),
    });
    return response;
  }
}