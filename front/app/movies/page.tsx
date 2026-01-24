// "use client";
// import { useState } from "react";

// export default function MoviePage() {
//   const [movie, setMovie] = useState(null);

//   const getMovieData = async () => {
//     try {
//       // Simulate fetching movie data
//       const response = await fetch("/api/movies", {
//         method: "GET",
//       });
//       if (!response.ok) {
//         throw new Error("Failed to delete movie");
//       }
//       console.log("response", response);
//       setMovie(await response.json());
//     } catch (error) {
//       console.error("Error fetching movie data:", error);
//     }
//   };
//   getMovieData();
//   return <div>hello world</div>;
// }
// app/movies/page.tsx

import { fetchMovies } from "@/lib/movie-api";

export default async function MoviesPage() {
  const data = await fetchMovies({ page: 1, limit: 10 });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
