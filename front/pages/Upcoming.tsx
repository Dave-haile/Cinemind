"use client";

import React from "react";
import { Calendar, Bell } from "lucide-react";
import { UPCOMING_MOVIES } from "../constants";
import Image from "next/image";

const Upcoming: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-400">
              Mark your calendars for the most anticipated releases of the year.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UPCOMING_MOVIES.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row h-full"
            >
              <div className="relative w-full sm:w-2/5 aspect-3/4 sm:aspect-auto overflow-hidden">
                <Image
                  fill
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
              </div>

              <div className="p-8 flex flex-col justify-center flex-1">
                <div className="flex items-center space-x-2 text-red-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {movie.releaseDate}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-red-500 transition-colors">
                  {movie.title}
                </h3>
                <button className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl border border-neutral-700 text-sm font-bold text-white hover:bg-white hover:text-black transition-all">
                  <Bell className="w-4 h-4" />
                  <span>Remind Me</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
