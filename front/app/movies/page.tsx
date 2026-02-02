'use client'
import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Grid3X3, LayoutList, Filter, Star, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import EditorsChoice from "@/components/EditorsChoice";
import { fetchMovies } from "@/lib/movie-api";
import { Movie } from "@/types";

const sortOptions = [
  { value: "rating", label: "Top Rated" },
  { value: "year", label: "Newest" },
  { value: "title", label: "A-Z" },
];

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // API data states
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch movies from API
  useEffect(() => {
    const fetchMoviesData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params: {
          q?: string;
          genre?: string;
          page?: number;
          limit?: number;
        } = {
          page: 1,
          limit: 50, // Fetch more movies for better filtering experience
        };

        // Only add search query if it's not empty
        if (searchQuery.trim()) {
          params.q = searchQuery.trim();
        }

        // Only add genre filter if not "All"
        if (selectedGenre !== "All") {
          params.genre = selectedGenre;
        }

        const response = await fetchMovies(params);
        setMoviesData(response.results || []);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          pages: response.pages,
        });
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesData();
  }, [searchQuery, selectedGenre]);

  const filteredAndSortedMovies = useMemo(() => {
    const result = [...moviesData];

    // Sort (backend handles search and genre filtering)
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => (b.rating_avg || 0) - (a.rating_avg || 0));
        break;
      case "year":
        result.sort((a, b) => (b.release_year || 0) - (a.release_year || 0));
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [moviesData, sortBy]);

  const getGenres = useMemo(() => {
    return [...new Set(moviesData.flatMap((movie) => movie.genres))].sort();
  }, [moviesData]);

  console.log(moviesData);
  return (
    <div className="min-h-screen bg-[hsl(240_10%_4%)]">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[hsl(0_72%_51%)]/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(0_72%_51%)]/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-[hsl(45_93%_58%)]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center rounded-full border border-transparent bg-[hsl(240_5%_16%)] text-[hsl(0_0%_98%)] px-4 py-1.5 text-xs font-semibold mb-4">
              <Star className="w-3 h-3 mr-1 fill-[#f8c630] text-[#f8c630]" />
              Discover Amazing Films
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Browse <span className="text-gradient">Movies</span>
            </h1>
            <p className="text-[hsl(0,0%,65%)] text-lg max-w-2xl mx-auto mb-8">
              Explore our curated collection of critically acclaimed films, from timeless classics to the latest releases.
            </p>
          </div>

          {/* Editor's Choice */}
          <div className="max-w-5xl mx-auto mb-12">
            <EditorsChoice />
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(240_5%_65%)]" />
              <input
                type="text"
                placeholder="Search movies, directors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-14 w-full rounded-xl border border-[hsl(240_5%_18%/0.5)] bg-[hsl(240_5%_16%/0.5)] px-3 py-2 pl-12 text-lg ring-offset-[hsl(240_10%_4%)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[hsl(0_0%_98%)] placeholder:text-[hsl(240_5%_65%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-[hsl(0_72%_51%/0.5)]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {getGenres.map((genre) => (
                  <button
                    key={genre}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${selectedGenre === genre
                      ? "bg-[hsl(0_72%_51%)] text-[hsl(0_0%_100%)] shadow-lg shadow-[hsl(0_72%_51%/0.25)]"
                      : "border border-[hsl(240_5%_18%)] bg-[hsl(240_10%_4%)] hover:bg-[hsl(240_5%_16%)] hover:border-[hsl(0_72%_51%/0.5)]"
                      }`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              {/* Sort and View Options */}
              <div className="flex items-center gap-2">
                {/* clear genre filter */}
                {selectedGenre !== "All" && (
                  <button
                    onClick={() => setSelectedGenre("All")}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[hsl(240_5%_18%)] bg-[hsl(240_10%_4%)] hover:bg-[hsl(45_93%_58%)] hover:text-[hsl(240_10%_4%)] h-9 px-3"
                  >
                    <X className="w-4 h-4" />
                    Clear Genre
                  </button>
                )}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[hsl(240_5%_18%)] bg-[hsl(240_10%_4%)] hover:bg-[hsl(45_93%_58%)] hover:text-[hsl(240_10%_4%)] h-9 px-3"
                  >
                    <Filter className="w-4 h-4" />
                    {sortOptions.find((o) => o.value === sortBy)?.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isSortMenuOpen && (
                    <div className="absolute right-0 top-full z-50 min-w-32 overflow-hidden rounded-md border bg-[hsl(240_10%_6%)] p-1 text-[hsl(0_0%_98%)] shadow-md mt-1">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortMenuOpen(false);
                          }}
                          className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-[hsl(45_93%_58%)] focus:text-[hsl(240_10%_4%)] w-full text-left ${sortBy === option.value ? "bg-[hsl(240_5%_16%)]" : ""
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex border border-[hsl(240_5%_18%)] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[hsl(45_93%_58%)] hover:text-[hsl(240_10%_4%)] h-8 w-8 ${viewMode === "grid" ? "bg-[hsl(240_5%_16%)]" : ""
                      }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[hsl(45_93%_58%)] hover:text-[hsl(240_10%_4%)] h-8 w-8 ${viewMode === "list" ? "bg-[hsl(240_5%_16%)]" : ""
                      }`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Results Count */}
          {!loading && !error && (
            <div className="flex items-center justify-between mb-8">
              <p className="text-[hsl(240_5%_65%)]">
                Showing <span className="text-[hsl(0_0%_98%)] font-semibold">{filteredAndSortedMovies.length}</span> movies
                {pagination && (
                  <span> of <span className="text-[hsl(0_0%_98%)]">{pagination.total}</span></span>
                )}
                {selectedGenre !== "All" && (
                  <span> in <span className="text-[hsl(0_72%_51%)]">{selectedGenre}</span></span>
                )}
                {searchQuery && (
                  <span> for &quot;<span className="text-[hsl(0_72%_51%)]">{searchQuery}</span>&quot;</span>
                )}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-[hsl(0_72%_51%)] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[hsl(240_5%_65%)]">Loading movies...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-24">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[hsl(0_72%_51%/0.1)] flex items-center justify-center">
                <Search className="w-10 h-10 text-[hsl(0_72%_51%)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Failed to load movies</h3>
              <p className="text-[hsl(240_5%_65%)] mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[hsl(240_5%_18%)] bg-[hsl(240_10%_4%)] hover:bg-[hsl(45_93%_58%)] hover:text-[hsl(240_10%_4%)] h-10 px-4 py-2"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Movies Grid/List */}
          {!loading && !error && filteredAndSortedMovies.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {filteredAndSortedMovies.map((movie, index) => (
                  <MovieCard key={movie.public_id} movie={movie} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedMovies.map((movie, index) => (
                  <MovieListItem key={movie.public_id} movie={movie} index={index} />
                ))}
              </div>
            )
          ) : !loading && !error && (
            <div className="text-center py-24">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[hsl(240_5%_16%/0.5)] flex items-center justify-center">
                <Search className="w-10 h-10 text-[hsl(240_5%_65%)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No movies found</h3>
              <p className="text-[hsl(240_5%_65%)] mb-6">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedGenre("All"); }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[hsl(240_5%_18%)] bg-[hsl(240_10%_4%)] hover:bg-[hsl(45_93%_58%)] hover:text-[hsl(240_10%_4%)] h-10 px-4 py-2"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

// List View Component
import { Play, Clock } from "lucide-react";

interface MovieListItemProps {
  movie: Movie;
  index: number;
}

const MovieListItem = ({ movie, index }: MovieListItemProps) => {
  return (
    <Link
      href={`/movie/${movie.public_id}`}
      className="group flex gap-4 md:gap-6 p-4 rounded-xl bg-[hsl(240_5%_16%/0.3)] border border-[hsl(240_5%_18%/0.5)] hover:border-[hsl(0_72%_51%/0.5)] hover:bg-[hsl(240_5%_16%/0.5)] transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative w-24 md:w-32 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={movie.cover_img}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[hsl(0_72%_51%/0.9)] flex items-center justify-center">
            <Play className="w-4 h-4 fill-[hsl(0_0%_100%)] text-[hsl(0_0%_100%)] ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-semibold text-lg md:text-xl truncate group-hover:text-[hsl(0_72%_51%)] transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[hsl(240_10%_4%/0.8)] flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-[hsl(45_93%_58%)] text-[hsl(45_93%_58%)]" />
            <span className="text-sm font-semibold">{movie.rating_avg?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(240_5%_65%)] mb-3">
          <span>{movie.release_year}</span>
          <span className="w-1 h-1 rounded-full bg-[hsl(240_5%_65%)]" />
          <span className="inline-flex items-center rounded-full border border-transparent bg-[hsl(240_5%_16%)] text-[hsl(0_0%_98%)] px-2.5 py-0.5 text-xs font-semibold">
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
          <p className="text-sm text-[hsl(240_5%_65%)] line-clamp-2 hidden md:block">
            {movie.description}
          </p>
        )}

        {movie.director && (
          <p className="text-sm text-[hsl(240_5%_65%)] mt-2 hidden lg:block">
            Directed by <span className="text-[hsl(0_0%_98%)]">{movie.director}</span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default Movies;
