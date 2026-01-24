export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface Movie {
    id: string;
    title: string;
    description: string;
    year: number;
  }
  
  export interface AuthResponse {
    user: User;
    token?: string;
    message: string;
    access_token?: string;
    refresh_token?: string;
  }
  export interface ApiError {
    message: string;
    status?: number;
    errors?: Record<string, string[]>;
  }