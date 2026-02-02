import Link from "next/link";
import { Play, Star, Clock, Award } from "lucide-react";
import Image from "next/image";
import { fetchMovies } from "@/lib/movie-api";
import { useState, useEffect } from "react";

export interface Movie {
  id: number;
  title: string;
  description?: string;
  release_year?: number;
  duration?: number;
  rating_avg?: number;
  video_url?: string;
  cover_img?: string;
  public_id: string;
  trailerUrl?: string;
  backdrop?: string;
  director?: string;
  cast?: string[];
  created_at?: string;
  genres: string[];
}

const EditorsChoice = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEditorsChoice = async () => {
      try {
        const data = await fetchMovies({ limit: 1, page: 1 });
        if (data.results && data.results.length > 0) {
          // Get the highest rated movie
          const editorsChoice = data.results.reduce((prev: Movie, current: Movie) =>
            (prev.rating_avg || 0) > (current.rating_avg || 0) ? prev : current
          );
          setMovie(editorsChoice);
        }
      } catch (error) {
        console.error('Failed to fetch editor\'s choice:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEditorsChoice();
  }, []);

  if (loading || !movie) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-[#27272b] via-[#27272b]/80 to-[#27272b]/50 border border-[#27272b]/50 animate-pulse">
        <div className="h-64 md:h-80 bg-[#27272b]/30"></div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-[#27272b] via-[#27272b]/80 to-[#27272b]/50 border border-[#27272b]/50">
      <div className="absolute inset-0 bg-linear-to-r from-[#dc2828]/5 via-transparent to-[#f8c630]/5 " />

      {/* Background Image with Overlay */}
      {(movie.backdrop || movie.cover_img) && (
        <div className="absolute inset-0 opacity-20">
          <Image
            src={movie.backdrop || movie.cover_img || ''}
            alt=""
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#27272b] via-[#27272b]/90 to-[#27272b]/70" />
        </div>
      )}

      <div className="relative flex flex-col md:flex-row gap-6 p-6 md:p-8">
        {/* Movie Poster */}
        <Link
          href={`/movie/${movie.public_id || movie.id}`}
          className="group relative w-40 md:w-48 shrink-0 mx-auto md:mx-0"
        >
          <div className="aspect-2/3 rounded-xl overflow-hidden shadow-2xl shadow-[hsl(0_72%_51%/0.2)] ring-2 ring-[hsl(0_72%_51%/0.2)]">
            {movie.cover_img ? (
              <Image
                src={movie.cover_img}
                alt={movie.title}
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-[hsl(240_5%_16%)] flex items-center justify-center">
                <Play className="w-8 h-8 text-[hsl(240_5%_65%)]" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[hsl(0_72%_51%/0.9)] flex items-center justify-center">
                <Play className="w-6 h-6 fill-[hsl(0_0%_100%)] text-[hsl(0_0%_100%)] ml-1" />
              </div>
            </div>
          </div>
        </Link>

        {/* Movie Info */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <div className="inline-flex items-center rounded-full border border-[hsl(45_93%_58%/0.3)] px-2.5 py-0.5 text-xs font-semibold bg-[hsl(45_93%_58%/0.2)] text-[hsl(45_93%_58%)] gap-1">
              <Award className="w-3 h-3" />
              Editor&apos;s Choice
            </div>
            <div className="inline-flex items-center rounded-full border border-transparent bg-[hsl(240_5%_16%)] text-[hsl(0_0%_98%)] px-2.5 py-0.5 text-xs font-semibold gap-1">
              <Star className="w-3 h-3 fill-[hsl(45_93%_58%)] text-[hsl(45_93%_58%)]" />
              {movie.rating_avg?.toFixed(1) || 'N/A'}
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-2">{movie.title}</h3>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-[hsl(240_5%_65%)] mb-4">
            <span>{movie.release_year}</span>
            <span className="w-1 h-1 rounded-full bg-[hsl(240_5%_65%)]" />
            <span className="px-2 py-0.5 rounded-full bg-[hsl(240_5%_16%)] text-[hsl(0_0%_98%)]">
              {movie.genres[0]}
            </span>
            {movie.duration && (
              <>
                <span className="w-1 h-1 rounded-full bg-[hsl(240_5%_65%)]" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                </span>
              </>
            )}
          </div>

          {movie.description && (
            <p className="text-[hsl(240_5%_65%)] text-sm md:text-base line-clamp-2 mb-6 max-w-2xl">
              {movie.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link href={`/movie/${movie.public_id || movie.id}`}>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[hsl(0_72%_51%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_72%_51%/0.9)] h-11 px-8 shadow-lg shadow-[hsl(0_72%_51%/0.25)]">
                <Play className="w-4 h-4 fill-current" />
                Watch Now
              </button>
            </Link>
            <Link href={`/movie/${movie.public_id || movie.id}`}>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[hsl(240_5%_18%)] bg-[hsl(240_10%_4%)] hover:bg-[hsl(45_93%_58%)] hover:text-[hsl(240_10%_4%)] h-11 px-8">
                Learn More
              </button>
            </Link>
          </div>

          {movie.director && (
            <p className="text-sm text-[hsl(240_5%_65%)] mt-4">
              Directed by <span className="text-[hsl(0_0%_98%)] font-medium">{movie.director}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorsChoice;
