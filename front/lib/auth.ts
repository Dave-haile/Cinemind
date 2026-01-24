// lib/auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiClient } from './api-client';
import { ENDPOINTS, COOKIE_OPTIONS } from './config';
import { User, AuthResponse } from "@/types/api";
import { RegisterData } from "@/types";

export async function setAuthCookies(token: string, user: User) {
  const cookieStore = await cookies();
  
  // Set auth token
  cookieStore.set('auth_token', token, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  
  // Set user data
  cookieStore.set('user', JSON.stringify(user), {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  
  cookieStore.delete('auth_token');
  cookieStore.delete('user');
  cookieStore.delete('refresh_token');
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    
    if (!userCookie?.value) {
      return null;
    }
    
    return JSON.parse(userCookie.value);
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value || null;
}

export async function requireAuth(redirectTo: string = '/login') {
  const user = await getCurrentUser();
  const token = await getAuthToken();
  
  if (!user || !token) {
    redirect(redirectTo);
  }
  
  return { user, token };
}

// Auth-specific API methods
export const authApi = {
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, userData);
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(ENDPOINTS.AUTH.LOGOUT, {});
    } finally {
      await clearAuthCookies();
    }
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>(ENDPOINTS.AUTH.ME);
  },
};