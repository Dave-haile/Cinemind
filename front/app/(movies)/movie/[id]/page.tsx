import MovieDetail from "@/components/MovieDetail";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  console.log("params", params);
  const resolvedParams = await params;
  return <MovieDetail publicId={resolvedParams.id} />;
}
