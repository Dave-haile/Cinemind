import { API_BASE_URL } from "./config";
import { getAuthToken } from "./auth";

export async function serverFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}
