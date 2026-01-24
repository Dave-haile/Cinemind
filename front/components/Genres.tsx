"use client";

import React from "react";
import { GENRES } from "../constants";

const Genres: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-black tracking-tight mb-8 uppercase text-gray-500">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {GENRES.map((genre, idx) => (
            <button
              key={idx}
              className="relative group overflow-hidden rounded-2xl h-24 flex items-center justify-center transition-all active:scale-95"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-2xl transition-colors" />
              <div className="relative z-10 flex items-center space-x-3">
                <div className="p-2 bg-black/40 rounded-lg backdrop-blur-md">
                  {genre.icon}
                </div>
                <span className="font-bold text-lg group-hover:scale-110 transition-transform">
                  {genre.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Genres;
