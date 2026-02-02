"use client";

import React from "react";
import { Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NOW_PLAYING_MOVIES } from "../constants";
import Image from "next/image";

const NowPlaying: React.FC = () => {
  return (
    <section id="now-playing" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2 text-white">
              Now Playing
            </h2>
            <p className="text-gray-400">
              Stream the latest global hits right from your living room.
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-800 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-800 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-8 snap-x no-scrollbar">
          {NOW_PLAYING_MOVIES.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="min-w-[300px] md:min-w-[450px] snap-start group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 transition-transform duration-500 hover:scale-[1.02]"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  fill
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                {/* Watch Now Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600 text-white flex items-center space-x-2 px-6 py-3 rounded-full font-bold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-current" />
                    <span>Watch Now</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest">
                    {movie.genre}
                  </span>
                  <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-white">
                      {movie.rating}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {movie.year} • Available in 4K Ultra HD
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default NowPlaying;
