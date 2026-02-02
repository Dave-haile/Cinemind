'use client';

import { useState } from 'react';
import Hero from '../pages/Hero';
import Genres from '../pages/Genres';
import NowPlaying from '../pages/NowPlaying';
import Trending from '../pages/Trending';
import Upcoming from '../pages/Upcoming';
import Reviews from '../pages/Reviews';
import Features from '../pages/Features';
import Pricing from '../pages/Pricing';
import { Sparkles } from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function HomePage() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getAIRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      setRecommendation("Failed to get a recommendation. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Hero />

      {/* Statistics/Social Proof Section */}
      <div className="py-12 border-y border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-8 grayscale opacity-50">
          <div className="text-2xl font-black text-white italic tracking-tighter uppercase">MoviEDB</div>
          <div className="text-2xl font-black text-white italic tracking-tighter uppercase">Cineaste</div>
          <div className="text-2xl font-black text-white italic tracking-tighter uppercase">ReelStream</div>
          <div className="text-2xl font-black text-white italic tracking-tighter uppercase">ScreenPal</div>
          <div className="text-2xl font-black text-white italic tracking-tighter uppercase">FilmVue</div>
        </div>
      </div>

      <Genres />
      <NowPlaying />

      {/* AI Recommendation Spotlight Section */}
      <section className="py-12 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl transition-all hover:border-red-500/20">
            <div className="p-4 bg-red-600/10 rounded-2xl">
              <Sparkles className="w-12 h-12 text-red-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <span className="bg-red-600/20 text-red-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Powered by Gemini</span>
                <h3 className="text-2xl font-bold text-white">AI Spotlight</h3>
              </div>
              <p className="text-gray-400 mb-4">Not sure what to watch? Let our Gemini-powered engine decide for you.</p>
              {recommendation && (
                <div className="mb-6 p-4 bg-black/40 rounded-xl border border-white/5 animate-fade-in">
                  <p className="text-white font-medium italic">&ldquo;{recommendation}&rdquo;</p>
                </div>
              )}
              <button
                onClick={getAIRecommendation}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center space-x-2 mx-auto md:mx-0 min-w-[200px]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{recommendation ? 'Try Another' : 'Get Recommendation'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Trending />
      <Upcoming />
      <Reviews />
      <Features />
      <Pricing />

      {/* Call to Action Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-linear-to-br from-red-600 to-orange-500 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Find Your <br /> Next Favorite Movie?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto font-medium">
              Join our community today and get 1 month of premium AI-recommendations for free. No credit card required.
            </p>
            <button className="bg-white text-red-600 px-10 py-4 rounded-full font-black text-lg hover:bg-gray-100 transition-all shadow-2xl active:scale-95">
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </ MainLayout>
  );
}