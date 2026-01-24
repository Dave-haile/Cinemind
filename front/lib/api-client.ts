// import { API_BASE_URL } from './config';

// interface ApiOptions extends RequestInit {
//   timeout?: number;
//   headers?: Record<string, string>;
// }

// class ApiClient {
//   private baseUrl: string;

//   constructor(baseUrl: string = API_BASE_URL) {
//     this.baseUrl = baseUrl;
//   }

//   async request<T>(
//     endpoint: string,
//     options: ApiOptions = {}
//   ): Promise<T> {
//     const url = `${this.baseUrl}${endpoint}`;
//     const defaultHeaders = {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     };

//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);

//     try {
//       const response = await fetch(url, {
//         ...options,
//         headers: defaultHeaders,
//         signal: controller.signal,
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       clearTimeout(timeoutId);
//       throw error;
//     }
//   }

//   async get<T>(endpoint: string, options?: ApiOptions): Promise<T> {
//     return this.request<T>(endpoint, { ...options, method: 'GET' });
//   }

//   async post<T>(endpoint: string, data?: any, options?: ApiOptions): Promise<T> {
//     return this.request<T>(endpoint, {
//       ...options,
//       method: 'POST',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async put<T>(endpoint: string, data?: any, options?: ApiOptions): Promise<T> {
//     return this.request<T>(endpoint, {
//       ...options,
//       method: 'PUT',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async delete<T>(endpoint: string, options?: ApiOptions): Promise<T> {
//     return this.request<T>(endpoint, { ...options, method: 'DELETE' });
//   }
// }

// export const apiClient = new ApiClient();

// lib/api-client.ts

import { API_BASE_URL } from "./config";
import { ApiError } from "@/types/api";

interface RequestOptions extends RequestInit {
  timeout?: number;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData: { message?: string; errors?: Record<string, string[]> };
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "An error occurred" };
      }

      const error: ApiError = {
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
        errors: errorData.errors,
      };
      throw error;
    }

    return response.json();
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Default headers
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || 10000,
    );

    try {
      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
        signal: controller.signal,
        credentials: "include", // Important for cookies
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw { message: "Request timeout", status: 408 };
      }

      const errorMessage =
        error instanceof Error ? error.message : "Network error";
      throw { message: errorMessage, status: 500 };
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

// Singleton instance
export const apiClient = new ApiClient();
