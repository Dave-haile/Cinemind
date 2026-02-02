export interface User {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: string | undefined;
}

export async function getCurrentUser(): Promise<User | null> {
  const res = await fetch("/api/auth/me", {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
