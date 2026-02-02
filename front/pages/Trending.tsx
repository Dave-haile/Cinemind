"use client";

import React from "react";
import { Star, Play } from "lucide-react";
import Link from "next/link";
import { MOVIES } from "../constants";
import Image from "next/image";

const Trending: React.FC = () => {
  return (
    <section id="trending" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
              Trending Now
            </h2>
            <p className="text-gray-400">
              Hand-picked blockbusters and indie gems for you.
            </p>
          </div>
          <button className="text-red-500 font-bold hover:text-red-400 transition-colors flex items-center space-x-1 group">
            <span>View All</span>
            <div className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              →
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {MOVIES.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="group relative block"
            >
              {/* Poster Container */}
              <div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-neutral-800 mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  fill
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform shadow-xl">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-white/10">
                    HD
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                    {movie.genre}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-gray-300">
                      {movie.rating}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-white leading-tight group-hover:text-red-500 transition-colors line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{movie.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
