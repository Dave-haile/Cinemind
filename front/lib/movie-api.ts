const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export async function fetchMovies(params: {
  q?: string;
  genre?: string;
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams({
    ...(params.q && { q: params.q }),
    ...(params.genre && { genre: params.genre }),
    page: String(params.page || 1),
    limit: String(params.limit || 10),
  }).toString();

  const res = await fetch(`${BASE_URL}/api/movies?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch movies");

  return res.json();
}
