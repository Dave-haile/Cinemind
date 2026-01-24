// export const API_BASE_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

// export const API_ENDPOINTS = {
//   AUTH: {
//     LOGIN: '/auth/login',
//     REGISTER: '/auth/register',
//     LOGOUT: '/auth/logout',
//   },
//   MOVIES: '/movies',
// };

// lib/config.ts
export const API_BASE_URL = process.env.FLASK_API_URL || 'http://localhost:5000';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  MOVIES: {
    BASE: '/movies',
    BY_ID: (id: string) => `/movies/${id}`,
    SEARCH: '/movies/search',
  },
};