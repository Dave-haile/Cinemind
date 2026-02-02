import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { clearAuth } from '@/lib/auth-server';

export async function POST() {
  try {
    await apiClient.post('/auth/logout', {});

    await clearAuth();

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Logout error:', error);
    await clearAuth();

    return NextResponse.json(
      { error: 'Logged out locally' },
      { status: 200 }
    );
  }
}