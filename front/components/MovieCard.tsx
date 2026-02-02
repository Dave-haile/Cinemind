import { Star, Play } from "lucide-react";
import Link from "next/link";
import { Movie } from "@/app/movies/page";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  return (
    <Link
      href={`/movie/${movie.public_id || movie.id}`}
      className="group relative rounded-xl overflow-hidden hover-lift cursor-pointer block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="aspect-2/3 relative">
        <Image
          fill
          src={movie.cover_img || '/placeholder-movie.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[hsl(240_10%_4%)] via-[hsl(240_10%_4%/0.5)] to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-[hsl(0_72%_51%/0.9)] flex items-center justify-center backdrop-blur-sm">
            <Play className="w-6 h-6 fill-[hsl(0_0%_100%)] text-[hsl(0_0%_100%)] ml-1" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-[hsl(240_10%_4%/0.8)] backdrop-blur-sm">
          <Star className="w-3 h-3 fill-[hsl(45_93%_58%)] text-[hsl(45_93%_58%)]" />
          <span className="text-xs font-semibold">{movie.rating_avg?.toFixed(1) || 'N/A'}</span>
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-semibold text-sm md:text-base truncate mb-1 group-hover:text-[hsl(0_72%_51%)] transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-[hsl(240_5%_65%)]">
          <span>{movie.release_year}</span>
          <span className="w-1 h-1 rounded-full bg-[hsl(240_5%_65%)]" />
          <span className="px-2 py-0.5 rounded-full bg-[hsl(240_5%_16%)] text-[hsl(0_0%_98%)]">
            {movie.genres[0]}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
