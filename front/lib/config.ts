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

export const API_BASE_URL =
  process.env.FLASK_API_URL || "http://localhost:5000";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },
  MOVIES: {
    SEARCH: "/movies/search",
    BY_ID: (id: string) => `/movies/${id}`,
  },
};
