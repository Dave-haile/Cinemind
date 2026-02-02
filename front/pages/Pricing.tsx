"use client";

import React from "react";
import { Check } from "lucide-react";
import { PLANS } from "../constants";

const Pricing: React.FC = () => {
  return (
    <section
      id="pricing"
      className="py-24 bg-neutral-950 relative overflow-hidden"
    >
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            The Perfect Plan for You
          </h2>
          <p className="text-gray-400">
            Choose the level of immersion that fits your viewing habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-10 rounded-[2.5rem] border ${plan.recommended ? "bg-neutral-900 border-red-500/50 shadow-2xl shadow-red-500/10 scale-105 z-10" : "bg-neutral-900/50 border-neutral-800"} transition-all duration-500 hover:-translate-y-2`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-widest">
                  {plan.name}
                </h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-black text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-2 font-medium">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center space-x-3 text-sm text-gray-300"
                  >
                    <Check className="w-5 h-5 text-red-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-black transition-all active:scale-95 ${plan.recommended ? "bg-red-600 text-white hover:bg-red-700" : "bg-white text-black hover:bg-gray-200"}`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
