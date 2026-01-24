import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { clearAuthCookies } from '@/lib/auth';

export async function POST() {
  try {
    await apiClient.post('/auth/logout', {});
    
    await clearAuthCookies();
    
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Logout error:', error);
    await clearAuthCookies();
    
    return NextResponse.json(
      { error: 'Logged out locally' },
      { status: 200 }
    );
  }
}