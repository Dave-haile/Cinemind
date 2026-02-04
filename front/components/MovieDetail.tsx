"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, Calendar, Play, Plus, Heart } from "lucide-react";
import Image from "next/image";
import MainLayout from "./MainLayout";
import { Movie } from "@/types";

const MovieDetail = ({ publicId }: { publicId: string }) => {
  console.log("publicId", publicId);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("trailer");

  useEffect(() => {
    if (!publicId || publicId === 'undefined') {
      setError('Invalid movie ID');
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${publicId}`, { method: "GET" });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        if (!response.ok) {
          throw new Error('Movie not found');
        }

        const movieData = await response.json();
        setMovie(movieData);
      } catch (err) {
        console.error('Failed to fetch movie:', err);
        setError('Movie not found');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [publicId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-[hsl(240_10%_4%)] flex items-center justify-center mt-20">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-[hsl(0_72%_51%)] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[hsl(240_5%_65%)]">Loading movie...</span>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !movie) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-[hsl(240_10%_4%)] flex items-center justify-center mt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
            <Link href="/" className="text-[hsl(0_72%_51%)] hover:underline">
              Go back home
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  console.log("movie", movie);
  return (
    <MainLayout>
      <div className="min-h-screen bg-[hsl(240_10%_4%)] mt-20">

        {/* Hero Backdrop */}
        <div className="relative h-[60vh] md:h-[70vh]">
          {(movie.backdrop || movie.cover_img) ? (
            <Image
              fill
              src={movie.backdrop || movie.cover_img || ''}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[hsl(240_5%_16%)] to-[hsl(240_10%_4%)]"></div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[hsl(240_10%_4%)] via-[hsl(240_10%_4%/0.6)] to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[hsl(240_10%_4%/0.8)] via-transparent to-transparent" />

          <Link
            href="/movies"
            className="absolute top-8 left-14 z-10 flex items-center gap-2 text-[hsl(240_5%_65%)] hover:text-[hsl(0_0%_98%)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Movie Info */}
        <div className="container mx-auto px-6 -mt-60 md:-mt-88 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="shrink-0">
              {movie.cover_img ? (
                <Image
                  width={256}
                  height={384}
                  src={movie.cover_img}
                  alt={movie.title}
                  className="w-48 md:w-64 rounded-xl shadow-2xl mx-auto md:mx-0"
                />
              ) : (
                <div className="w-48 md:w-64 h-72 md:h-96 rounded-xl bg-[hsl(240_5%_16%)] flex items-center justify-center mx-auto md:mx-0">
                  <Play className="w-16 h-16 text-[hsl(240_5%_65%)]" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 text-[hsl(240_5%_65%)]">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[hsl(45_93%_58%)] text-[hsl(45_93%_58%)]" />
                  <span className="font-semibold text-[hsl(0_0%_98%)]">{movie.rating_avg?.toFixed(1) || 'N/A'}</span>
                  <span>/10</span>
                </div>
                {movie.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.release_year}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[hsl(240_5%_16%)] text-[hsl(0_0%_98%)] text-sm">
                  {movie.genres[0]}
                </span>
              </div>

              {/* Director */}
              {movie.director && (
                <p className="text-[hsl(240_5%_65%)] mb-4">
                  <span className="text-[hsl(0_0%_98%)] font-medium">Director:</span> {movie.director}
                </p>
              )}

              {/* Description */}
              <p className="text-[hsl(240_5%_65%)] leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
                {movie.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link href={`/watch/${publicId}`}>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[hsl(0_72%_51%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_72%_51%/0.9)] h-11 px-8">
                    <Play className="w-5 h-5 fill-current" />
                    Watch Now
                  </button>
                </Link>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[hsl(240_5%_18%)] bg-[hsl(240_10%_4%)] hover:bg-[hsl(45_93%_58%)] hover:text-[hsl(240_10%_4%)] h-11 px-8">
                  <Plus className="w-5 h-5" />
                  Add to Watchlist
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[hsl(45_93%_58%)] hover:text-[hsl(240_10%_4%)] h-10 w-10">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <div className="w-full">
              {/* Tab List */}
              <div className="flex items-center justify-center bg-[hsl(240_5%_16%/0.5)] rounded-lg p-1 mb-8 max-w-md mx-auto">
                {[
                  { value: 'trailer', label: 'Trailer' },
                  { value: 'cast', label: 'Cast' },
                  { value: 'similar', label: 'Similar Movies' }
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.value
                      ? 'bg-[hsl(240_10%_4%)] text-[hsl(0_0%_98%)] shadow-sm'
                      : 'text-[hsl(240_5%_65%)] hover:text-[hsl(0_0%_98%)]'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'trailer' && (
                <div className="aspect-video max-w-4xl rounded-xl overflow-hidden bg-[hsl(240_5%_16%)]">
                  {movie.trailerUrl ? (
                    <iframe
                      src={movie.trailerUrl}
                      title={`${movie.title} Trailer`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[hsl(240_5%_65%)]">
                      <div className="text-center">
                        <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Trailer not available</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'cast' && (
                <div>
                  {movie.cast && movie.cast.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {movie.cast.slice(0, 10).map((member, index) => (
                        <div key={index} className="text-center group pb-12">
                          <div className="relative w-24 h-24  md:w-32 md:h-32 mx-auto mb-3 rounded-full overflow-hidden bg-[hsl(240_5%_16%)] flex items-center justify-center">
                            <Image
                              width={100}
                              height={100}
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                            {/* <span className="text-2xl font-bold text-[hsl(240_5%_65%)]">
                              {member.name.charAt(0).toUpperCase()}
                            </span> */}
                          </div>
                          <h4 className="font-medium text-sm md:text-base truncate">
                            {member.name}
                          </h4>
                          <p className="text-xs md:text-sm text-[hsl(240_5%_65%)] truncate">
                            {member.character}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[hsl(240_5%_65%)]">
                      <p>Cast information not available</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'similar' && (
                <div className="text-center py-12 text-[hsl(240_5%_65%)]">
                  <p>Similar movies feature coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div></MainLayout>
  );
};

export default MovieDetail;
