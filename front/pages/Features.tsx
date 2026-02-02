"use client";

import React from "react";
import { FEATURES } from "../constants";

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            The Future of Streaming
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience movies like never before with our cutting-edge features
            designed for true cinephiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="mb-6 p-3 bg-neutral-800 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
