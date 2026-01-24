import { cookies } from "next/headers";
import { COOKIE_OPTIONS } from "./config";

export async function setAuthToken(token: string) {
  const store = await cookies();
  store.set("auth_token", token, COOKIE_OPTIONS);
}

export async function clearAuth() {
  const store = await cookies();
  store.delete("auth_token");
}

export async function getAuthToken() {
  const store = await cookies();
  return store.get("auth_token")?.value || null;
}
