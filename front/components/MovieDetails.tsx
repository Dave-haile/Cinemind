"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Play,
  Star,
  Clock,
  Calendar,
  User,
  ChevronLeft,
  Share2,
  X,
  Copy,
  Twitter,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { ALL_MOVIES, MOCK_REVIEWS } from "../constants";
import Image from "next/image";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movie = ALL_MOVIES.find((m) => m.id === Number(id));
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4">Movie Not Found</h2>
          <Link
            href="/"
            className="text-red-500 font-bold hover:underline flex items-center justify-center space-x-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const similarMovies = ALL_MOVIES.filter(
    (m) => m.genre === movie.genre && m.id !== movie.id,
  ).slice(0, 4);

  const trailers = [
    {
      id: 1,
      title: "Official Trailer",
      duration: "2:15",
      thumbnail: `https://picsum.photos/seed/${movie.id}t1/640/360`,
    },
    {
      id: 2,
      title: "Teaser Trailer",
      duration: "1:05",
      thumbnail: `https://picsum.photos/seed/${movie.id}t2/640/360`,
    },
    {
      id: 3,
      title: "Behind the Scenes",
      duration: "4:30",
      thumbnail: `https://picsum.photos/seed/${movie.id}t3/640/360`,
    },
    {
      id: 4,
      title: "Cast Interview",
      duration: "8:45",
      thumbnail: `https://picsum.photos/seed/${movie.id}t4/640/360`,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          />
          <div className="relative bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 max-w-md w-full animate-fade-in shadow-2xl">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black mb-6">Share this Movie</h3>
            <div className="grid grid-cols-4 gap-4 mb-8">
              <button className="flex flex-col items-center space-y-2 group">
                <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Twitter className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Twitter
                </span>
              </button>
              <button className="flex flex-col items-center space-y-2 group">
                <div className="p-4 bg-indigo-500/10 text-indigo-500 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Facebook className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Facebook
                </span>
              </button>
              <button className="flex flex-col items-center space-y-2 group">
                <div className="p-4 bg-green-500/10 text-green-500 rounded-2xl group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  WhatsApp
                </span>
              </button>
              <button className="flex flex-col items-center space-y-2 group">
                <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl group-hover:bg-red-500 group-hover:text-white transition-all">
                  <Copy className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Copy Link
                </span>
              </button>
            </div>
            <div className="relative">
              <input
                readOnly
                value={`https://cinematch.app/movie/${movie.id}`}
                className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-xs text-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={movie.backdropUrl || movie.imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20">
          <Link
            href="/"
            className="w-fit flex items-center space-x-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-bold text-sm">Back to Discovery</span>
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                Featured
              </span>
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-lg">{movie.rating}</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-6">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-300 font-medium mb-10">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>{movie.duration || "2h 15min"}</span>
              </div>
              <div className="px-3 py-1 border border-white/20 rounded-lg text-xs font-black uppercase tracking-widest">
                {movie.genre}
              </div>
              <span className="text-white/40">Available in 4K HDR</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all active:scale-95 shadow-xl">
                <Play className="w-6 h-6 fill-current" />
                <span>Watch Trailer</span>
              </button>
              <div className="flex w-full sm:w-auto space-x-4">
                <button className="flex-1 sm:flex-none bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
                  Add to Watchlist
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-5 rounded-2xl hover:bg-white/20 transition-all group"
                >
                  <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Info */}
        <div className="lg:col-span-2">
          <div className="mb-16">
            <h2 className="text-3xl font-black mb-6 text-white tracking-tight">
              Synopsis
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed font-medium">
              {movie.synopsis ||
                "In a world where destiny is forged in the shadows, one hero must rise above the chaos. This cinematic masterpiece explores the boundaries of human emotion, blending high-stakes action with a deeply personal journey of discovery and redemption."}
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 text-white tracking-tight">
              Top Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {(movie.cast || ["John Doe", "Jane Smith", "Robert Brown"]).map(
                (actor, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl flex items-center space-x-4 hover:border-red-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight">
                        {actor}
                      </h4>
                      <p className="text-xs text-gray-500">Actor</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Trailers Carousel */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-white tracking-tight">
                Trailers & Clips
              </h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500 px-3 py-1 bg-red-500/10 rounded-full">
                4 Videos
              </span>
            </div>
            <div className="flex space-x-6 overflow-x-auto pb-6 snap-x no-scrollbar">
              {trailers.map((trailer) => (
                <div
                  key={trailer.id}
                  className="min-w-70 md:min-w-85 snap-start group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 mb-4 transition-transform group-hover:scale-[1.02]">
                    <Image
                      src={trailer.thumbnail}
                      alt={trailer.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-2xl group-hover:scale-110 transition-all duration-300">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 backdrop-blur-md text-[10px] font-black rounded-lg">
                      {trailer.duration}
                    </div>
                  </div>
                  <h4 className="text-white font-bold group-hover:text-red-500 transition-colors">
                    {trailer.title}
                  </h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-black mt-1">
                    Video • HD
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-12">
          {/* Similar Movies */}
          <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-[2.5rem]">
            <h3 className="text-xl font-black mb-6 text-white uppercase tracking-widest">
              Similar to this
            </h3>
            <div className="space-y-6">
              {similarMovies.length > 0 ? (
                similarMovies.map((similar) => (
                  <Link
                    key={similar.id}
                    href={`/movie/${similar.id}`}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-800">
                      <Image
                        src={similar.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        alt={similar.title}
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight group-hover:text-red-500 transition-colors">
                        {similar.title}
                      </h4>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-400 font-bold">
                          {similar.rating}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-black uppercase mt-1 block">
                        {similar.year}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No similar titles found.
                </p>
              )}
            </div>
          </div>

          {/* User Review Snapshot */}
          <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-[2.5rem]">
            <h3 className="text-xl font-black mb-6 text-white uppercase tracking-widest">
              Recent Feedback
            </h3>
            <div className="space-y-6">
              {MOCK_REVIEWS.slice(0, 1).map((review) => (
                <div key={review.id}>
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-white font-bold text-sm">
                      Recommended
                    </span>
                  </div>
                  <p className="text-gray-400 italic text-sm leading-relaxed mb-4">
                    &quot;{review.comment}&quot;
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-800" />
                    <span className="text-xs font-bold text-gray-500">
                      {review.userName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;
