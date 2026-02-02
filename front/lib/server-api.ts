import { API_BASE_URL } from "./config";
import { getAuthToken } from "./auth-server";

export async function serverFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}
