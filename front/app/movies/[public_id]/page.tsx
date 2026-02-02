import MovieDetails from "../../../components/MovieDetails";

export default async function MoviePage() {
  try {
    // Simulate fetching movie data
    const response = await fetch("/api/movies", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }
    console.log("response", response);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
  return <MovieDetails />;
}
